from api.config import app, db, api
from flask_migrate import Migrate
from flask_restful import Resource
from flask import request
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_bcrypt import generate_password_hash
from api.models import (
    User,
    Payment,
    Address,
    Product,
    Category,
    # Review,
    # Comment,
    # Role,
    Cart,
    CartItem,
    Order,
    OrderItems
)
# import ipdb
import traceback

migrate = Migrate(app, db)
login_manager = LoginManager()
login_manager.init_app(app)

# Rinse & Repeat
########################## LOGIN, SINGUP, LOGOUT #########################


@login_manager.user_loader
def load_user(user_id):
    return User.query.filter_by(id=user_id).first()


class Signup(Resource):
    def post(self):
        data = request.get_json()
        new_user = User(
            username=data['username'],
            name=data['name'],
            email=data['email'],
        )
        new_user.password_hash = data['password']
        # Create Cart
        new_cart = Cart()
        new_user.cart = new_cart
        # Create Role & find another method
        # new_role = Role(name='Regular')
        # new_user.Urole = new_role

        # Create Wishlist
        # Need & define a table

        # Commit changes
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user, remember=True)
        return new_user.to_dict(), 201
# Working


class Login(Resource):
    def post(self):
        data = request.get_json()
        # Atribute Needed to fetch Username or their email
        identifier = data.get('identifier')
        password = data.get('password')
        user = User.query.filter((User.email == identifier) | (
            User.username == identifier)).first()
        if user:
            if user.authenticate(password):
                login_user(user, remember=True)
                return user.to_dict(), 200
        return {'Error': '401 Unauthorized'}, 401
# Working


@app.route("/logout", methods=["POST"])  # Regular flask Syntax
# ensuring that the user must be authenticated before accessing the endpoint.
@login_required
def logout():
    logout_user()  # clearing the user's session and marking them as logged out
    return f'Logout Successful'  # , redirect(url_for('home'))
# Working


class CheckSession(Resource):
    def get(self):
        if current_user.is_authenticated:
            user = current_user.to_dict()
            return user, 200
        return {"Error": "Unauthorized user"}, 401
# working


api.add_resource(Login, '/login')
api.add_resource(Signup, '/signup')
api.add_resource(CheckSession, '/check_session')

# ################ USER ROUTES ######################

# If adding new route, server needs to be restarted


class Users(Resource):
    @login_required
    def get(self):
        try:
            user = current_user
            if user:
                return {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                }, 200
            else:
                return {"Error": "User not found"}, 404
        except:
            return {"Error": "Error fetching User data"}, 500
        # working

    @login_required
    def patch(self):
        try:
            user = current_user
            if user:
                data = request.get_json()
                user.email = data.get('email', user.email)
                # Hashed
                user_pass = data.get("password")
                if user_pass:
                    hashedP = generate_password_hash(user_pass)
                    user._password_hash = hashedP
                # Add Patch for username

                db.session.commit()
                return {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email
                }, 200
            else:
                return {"error": "User not found"}, 404
        except:
            return {"error": "Error with Updating Users"}, 500
        # Working

    @login_required
    def delete(self):
        try:
            user = current_user
            if user:
                db.session.delete(user)
                db.session.commit()
                return {}, 204
            else:
                return {"error": "User not found"}, 404
        except:
            return {"error": "Error with Deleting User"}, 500

        # Working
api.add_resource(Users, '/users')
# Fully fuctional


class UserOrders(Resource):
    @login_required
    def get(self):
        try:
            user_id = current_user.id
            orders = Order.query.filter_by(user_id=user_id).all()
            order_history = []
            for order in orders:
                order_status = order.status.status if order.status else None
                order_history.append({
                    "order_id": order.id,
                    "order_total": order.order_total,
                    "status": order_status,
                    "created": order.created_at.isoformat() if order.created_at else None
                })
            return order_history, 200
        except Exception as e:
            traceback.print_exc()
            return {"error": "Error while fetching order history", "message": str(e)}, 500


api.add_resource(UserOrders, '/user/orders')
# Working


class UserOrdersByID(Resource):
    @login_required
    def get(self, order_id):
        try:
            user_id = current_user.id
            order = Order.query.filter_by(id=order_id, user_id=user_id).first()
            if order:
                # Check with Current order table
                order_items = [
                    {
                        "product_id": item.product_id,
                        "product_name": item.product.name,
                        "num_of_items": item.num_of_items,
                        "items_price": item.items_price
                    }
                    for item in order.order_items
                ]
                order_info = {
                    "order_id": order.id,
                    "order_total": order.order_total,
                    "order_items": order_items
                }
                return order_info, 200
            else:
                return {"error": "Order not found"}, 404
        except:
            return {"error": "Error occured Fetching order data"}, 500

    @login_required
    def delete(self, order_id):
        try:
            user_id = current_user.id
            order = Order.query.filter_by(id=order_id, user_id=user_id).first()
            if order:
                db.session.delete(order)
                db.session.commit()
                return {}, 204
            else:
                return {"Error": "Order not found"}, 404
        except:
            return {"Error": "Error with cancellation of current order"}, 500


# Need orders to tests
api.add_resource(UserOrdersByID, '/user/orders/<int:order_id>')


class UserPayments(Resource):
    @login_required
    def get(self, user_id):
        try:
            user_payments = Payment.query.filter_by(user_id=user_id).all()
            if user_payments:
                payment_info = []
                for payment in user_payments:
                    payment_info.append({
                        "id": payment.id,
                        "card_number": payment.card_number,
                        "cardholder_name": payment.cardholder_name,
                        "expiration_month": payment.expiration_month,
                        "expiration_year": payment.expiration_year,
                        "cvv": payment.cvv
                    })
                return payment_info, 200
            else:
                return {"error": "Payment details not found"}, 404
        except:
            return {"error": "An error occurred while fetching the payment details"}, 500

    @login_required
    def post(self, user_id):
        try:
            data = request.get_json()
            card_number = data.get("card_number")
            cardholder_name = data.get("cardholder_name")
            expiration_month = data.get("expiration_month")
            expiration_year = data.get("expiration_year")
            cvv = data.get("cvv")
            if not card_number or not cardholder_name or not expiration_month or not expiration_year or not cvv:
                return {"Error": "Payment details required"}, 400
            user_payment = Payment(
                user_id=user_id,
                card_number=card_number,
                cardholder_name=cardholder_name,
                expiration_month=expiration_month,
                expiration_year=expiration_year,
                cvv=cvv
            )
            db.session.add(user_payment)
            db.session.commit()
            new_payment_info = {
                "id": user_payment.id,
                "card_number": user_payment.card_number,
                "cardholder_name": user_payment.cardholder_name,
                "expiration_month": user_payment.expiration_month,
                "expiration_year": user_payment.expiration_year,
                "cvv": user_payment.cvv
            }
            return new_payment_info, 201
        except Exception as e:
            traceback.print_exc()
            return {"Error": "Error encountered while adding the payment details", "message": str(e)}, 500


# Get working,
# Post working, Logic needs fixing on validation of month and year
# Functional otherwise
api.add_resource(UserPayments, '/payments/<int:user_id>')


class UserPaymentsByID(Resource):
    @login_required
    def get(self, user_id, payment_id):
        try:
            user_payment = Payment.query.filter_by(
                user_id=user_id, id=payment_id).first()
            if user_payment:
                payment_info = {
                    "id": user_payment.id,
                    "card_number": user_payment.card_number,
                    "cardholder_name": user_payment.cardholder_name,
                    "expiration_month": user_payment.expiration_month,
                    "expiration_year": user_payment.expiration_year,
                    "cvv": user_payment.cvv
                }
                return payment_info, 200
            else:
                return {"error": "Payment details not found"}, 404
        except:
            return {"error": "An error occurred while fetching the payment details"}, 500

    @login_required
    def delete(self, user_id, payment_id):
        try:
            user_payment = Payment.query.filter_by(
                user_id=user_id, id=payment_id).first()
            if user_payment:
                db.session.delete(user_payment)
                db.session.commit()
                return {}, 204
            else:
                return {"error": "Payment details not found"}, 404
        except:
            return {"error": "An error occurred while deleting the payment details"}, 500


# Get Working
# Delete Working
# Fully functional
api.add_resource(UserPaymentsByID, '/payments/<int:user_id>/<int:payment_id>')


class UserAddress(Resource):
    @login_required
    def get(self, user_id):
        try:
            addresses = Address.query.filter_by(user_id=user_id).all()
            address_list = []
            for address in addresses:
                address_info = {
                    "id": address.id,
                    "address_1": address.address_1,
                    "address_2": address.address_2,
                    "address_city": address.address_city,
                    "address_state": address.address_state,
                    "address_postal": address.address_postal,
                    "address_type_of": address.address_type_of
                }
                address_list.append(address_info)
            return address_list, 200
        except:
            return {"error": "An error occurred while fetching the addresses"}, 500

    @login_required
    def post(self, user_id):
        try:
            data = request.get_json()

            address = Address(
                user_id=user_id,
                address_1=data.get('address_1'),
                address_2=data.get('address_2', ''),
                address_city=data.get('address_city'),
                address_state=data.get('address_state'),
                address_postal=data.get('address_postal'),
                address_type_of=data.get('address_type_of')
            )

            db.session.add(address)
            db.session.commit()

            address_info = {
                'id': address.id,
                'address_1': address.address_1,
                'address_2': address.address_2,
                'address_city': address.address_city,
                'address_state': address.address_state,
                'address_postal': address.address_postal,
                'address_type_of': address.address_type_of
            }
            return address_info, 201

        except Exception as e:
            traceback.print_exc()
            return {'Error': 'Error while creating User address', "message": str(e)}, 500


# Get working(Returning empty list with empty data)
# Post working
# Fully functional
api.add_resource(UserAddress, '/addresses/<int:user_id>')


class UserAddressByID(Resource):
    @login_required
    def patch(self, user_id, address_id):
        try:
            data = request.get_json()
            address = Address.query.filter_by(
                id=address_id, user_id=user_id).first()
            if not address:
                return {"Error": "Address not found"}, 404

            for attr in data:
                setattr(address, attr, data[attr])
            db.session.add(address)
            db.session.commit()

            return address.to_dict(), 200
        except Exception as e:
            print("Error occurred:", str(e))
            return {"Error": "Error Updating Address", "message": str(e)}, 500

    @login_required
    def delete(self, user_id, address_id):
        try:
            address = Address.query.filter_by(
                id=address_id, user_id=user_id).first()
            if not address:
                return {"Error": "Address not found"}, 404

            db.session.delete(address)
            db.session.commit()
            return {}, 204
        except:
            return {"Error": "Error Deleting Address"}, 500


# Patch Working
# Delete Working
api.add_resource(UserAddressByID, '/addresses/<int:user_id>/<int:address_id>')


######################## Products Routes ###################
class Categories(Resource):
    def get(self):
        try:
            categories = [category.to_dict()
                          for category in Category.query.all()]
            return categories, 200
        except:
            return {"Error": "Categories not found"}, 404


api.add_resource(Categories, '/categories')


class Products(Resource):

    def get(self):
        try:
            products = [product.to_dict(
                # only=(
                # 'id',
                # 'name',
                # 'price',
                # 'quantity',
                # 'e_pitch',
                # 'description',
                # 'image_1',
                # 'image_2',
                # 'application',
                # 'ingredients',
                # 'storage',
                # 'intiative',
                # 'category_id')
            ) for product in Product.query.all()]
            return products, 200
        except Exception as e:
            return {"Error": "Failed to retrieve products", "message": str(e)}, 500

    def patch(self, id):
        try:
            data = request.get_json()
            product = Product.query.filter_by(id=id).first()

            if product:
                for attr, value in data.items():
                    setattr(product, attr, value)

                db.session.commit()
                return product.to_dict(
                    # only=(
                    # 'id',
                    # 'name',
                    # 'price',
                    # 'quantity',
                    # 'e_pitch',
                    # 'description',
                    # 'image_1',
                    # 'image_2',
                    # 'application',
                    # 'ingredients',
                    # 'storage',
                    # 'intiative',
                    # 'category_id'
                    # )
                ), 200
            else:
                return {"error": "Product not found"}, 404
        except Exception as e:
            return {"Error": "Failed to update product", "message": str(e)}, 500


api.add_resource(Products, '/products')


class ProductByCategory(Resource):
    print('Intializing get for product category')

    def get(self, category_id):
        try:
            # Connect with Seed
            products = Product.query.filter_by(category_id=category_id).all()
            products_data = [product.to_dict(
                # only=(
                # 'id',
                # 'name',
                # 'price',
                # 'quantity',
                # 'e_pitch',
                # 'description',
                # 'image_1',
                # 'image_2',
                # 'application',
                # 'ingredients',
                # 'storage',
                # 'intiative',
                # 'category_id')
            ) for product in products]
            return products_data, 200
        except:
            return {"Error": "Products not found for the specified category"}, 404


api.add_resource(ProductByCategory, '/products/category/<int:category_id>')


class ProductById(Resource):

    def get(self, id):
        try:
            product = Product.query.filter_by(id=id).first()
            return product.to_dict(
                # only=(
                # 'id',
                # 'name',
                # 'price',
                # 'quantity',
                # 'e_pitch',
                # 'description',
                # 'image_1',
                # 'image_2',
                # 'application',
                # 'ingredients',
                # 'storage',
                # 'intiative',
                # 'category_id')
            ), 200
        except Exception as e:
            return {"Error": "Failed to retrieve product", "message": str(e)}, 500


api.add_resource(ProductById, '/products/<int:id>')


class Carts(Resource):
    @login_required
    def get(self):
        try:
            cart_items = current_user.cart.cartItems
            items = [
                {
                    'item_id': item.id,
                    'product_id': item.product_id,
                    'product_name': item.product.name,
                    'product_image': item.product.image_1,
                    'product_price': item.product.price,
                    'quantity': item.quantity
                    # 'product_quantity': item.cart_quantity
                }
                for item in cart_items
            ]
            cart_info = {
                'user_id': current_user.id,
                'items': items
            }
            return cart_info, 200
        except:
            return {'Error': 'Error fetching cart data'}, 500

    @login_required
    def post(self):
        try:
            data = request.get_json()
            product_id = data.get('product_id')
            quantity = data.get('quantity')
            # cart_quantity = data.get('cart_quantity')

            product = Product.query.filter_by(id=product_id).first()
            if not product:
                return {'Error': 'Product not found'}, 404

            cart_item = CartItem.query.filter_by(
                cart_id=current_user.cart.id, product_id=product_id).first()
            if cart_item:
                # check logic with cart_quantity
                cart_item.quantity += quantity
                # cart_item.cart_quantity += cart_quantity
            else:
                cart_item = CartItem(
                    cart_id=current_user.cart.id,
                    product_id=product_id,
                    quantity=quantity
                    # cart_quantity= cart_quantity,
                )
                db.session.add(cart_item)

            db.session.commit()

            cart_items = current_user.cart.cartItems
            items = [
                {
                    'item_id': item.id,
                    'product_id': item.product_id,
                    'product_name': item.product.name,
                    'quantity': item.quantity,
                    # 'cart_quantity': item.cart_quantity
                }
                for item in cart_items
            ]
            cart_info = {
                'user_id': current_user.id,
                'items': items
            }
            return cart_info, 201
        except:
            return {'Error': 'Error occurred adding item to cart'}, 500

    @login_required
    def patch(self):
        try:
            data = request.get_json()
            product_id = data.get('product_id')
            # cart_quantity = data.get('cart_quantity')
            quantity = data.get('quantity')

            cart_item = CartItem.query.filter_by(
                cart_id=current_user.cart.id, product_id=product_id).first()
            if cart_item:
                # if cart_quantity is not None:
                #     cart_item.cart_quantity = cart_quantity
                #     # cart_item.quantity = quantity
                if quantity is not None:
                    cart_item.quantity = quantity
                db.session.commit()

                cart_items = current_user.cart.cartItems
                items = [
                    {
                        'item_id': item.id,
                        'product_id': item.product_id,
                        'product_name': item.product.name,
                        'quantity': item.quantity,
                        # 'cart_quantity': item.cart_quantity
                    }
                    for item in cart_items
                ]
                cart_info = {
                    'user_id': current_user.id,
                    'items': items
                }
                return cart_info, 200
            else:
                return {'Error': 'Item not found in cart'}, 404
        except Exception as e:
            traceback.print_exc
            return {'Error': 'Error while updating cart item', 'message': str(e)}, 500

    @login_required
    def delete(self):
        try:
            data = request.get_json()
            item_id = data.get('item_id')

            cart_item = CartItem.query.filter_by(
                cart_id=current_user.cart.id, id=item_id).first()
            if cart_item:
                db.session.delete(cart_item)
                db.session.commit()
                return {}, 204
            else:
                return {'Error': 'Item not found in cart'}, 404
        except:
            return {'Error': 'Error occurred while deleting item from cart'}, 500


# Working
api.add_resource(Carts, '/carts')


class Checkout(Resource):
    @login_required
    def post(self):
        try:
            cart = Cart.query.filter_by(user_id=current_user.id).first()
            if cart:
                total = 0.0
                for cart_item in cart.cartItems:
                    total += cart_item.product.price * cart_item.quantity
                    product = Product.query.filter_by(
                        id=cart_item.product_id).first()
                    product.quantity -= cart_item.quantity
                    db.session.add(product)
                order = Order(
                    user_id=current_user.id,
                    order_total=total,
                    status_id=1
                )
                db.session.add(order)
                #  .flush() communicates a series of operations to the database,he database maintains them as pending operations in a transaction. The changes aren't persisted permanently to disk, or visible to other transactions until the database receives a COMMIT for the current transaction
                db.session.flush()

                for cart_item in cart.cartItems:
                    order_item = OrderItems(
                        order_id=order.id,
                        product_id=cart_item.product_id,
                        num_of_items=cart_item.quantity,
                        items_price=cart_item.product.price
                    )
                    db.session.add(order_item)

                cart.cartItems.clear()

                db.session.commit()

                return {'message': 'Order placed successfully'}, 200
            else:
                return {'Error': 'Cart not found'}, 404
        except Exception as e:
            traceback.print_exc()
            # restores your database to your last COMMIT
            db.session.rollback()
            return {'Error': 'Error occurred placing order', 'details': str(e)}, 500


#
#
api.add_resource(Checkout, '/checkout')
# Working


##################### Review Routes (After MVP)#########################
# class ProductReviews(Resource):
#     def get(self, product_id):
#         try:
#             reviews = Review.query.filter_by(product_id=product_id).all()
#             review_list = []
#             for review in reviews:
#                 review_info = {
#                     'review_id': review.id,
#                     'user_id': review.user_id,
#                     'users_name': review.user.name,
#                     'review_rating': review.review_rating,
#                     'review_text': review.review_text,
#                     'created_at': review.created_at.isoformat() if review.created_at else None
#                 }

#                 if review.updated_at:
#                     review_info['updated_at'] = review.updated_at.isoformat()
#                     # sed to return a string of date, time, and UTC offset to the corresponding time zone

#                 review_list.append(review_info)
#             return review_list, 200
#         except:
#             return {'Error': 'Error while fetching Reviews'}, 500

#     @login_required
#     def post(self, product_id):
#         try:
#             user_id = current_user.id
#             data = request.get_json()
#             review_rating = int(data.get('review_rating'))
#             review_text = data.get('review_text')

#             product = Product.query.filter_by(id=product_id).first()
#             if not product:
#                 return {'Error': 'Product not found'}, 404

#             review = Review(
#                 user_id=user_id,
#                 product_id=product_id,
#                 review_rating=review_rating,
#                 review_text=review_text
#             )
#             db.session.add(review)
#             db.session.commit()

#             review_info = {
#                 'review_id': review.id,
#                 'user_id': review.user_id,
#                 'users_name': review.user.name,
#                 'review_rating': review.review_rating,
#                 'review_text': review.review_text,
#                 'created_at': review.created_at.isoformat() if review.created_at else None
#             }

#             if review.updated_at:
#                 review_info['updated_at'] = review.updated_at.isoformat()

#             return review_info, 201

#         except Exception as e:
#             print(e)
#             return {'Error': 'Error while posting review', 'message': str(e)}, 500

# class UserReview(Resource):
#     @login_required
#     def patch(self, review_id):
#         try:
#             user_id = current_user.id
#             review = Review.query.filter_by(id=review_id, user_id=user_id).first()
#             if review:
#                 data = request.get_json()
#                 review_rating = data.get('review_rating')
#                 review_text = data.get('review_text')

#                 review.review_rating = review_rating
#                 review.review_text = review_text
#                 review.updated_at = datetime.datetime.now()

#                 db.session.commit()

#                 review_info = {
#                     'review_id': review.id,
#                     'user_id': review.user_id,
#                     'review_rating': review.review_rating,
#                     'review_text': review.review_text,
#                     'created_at': review.created_at.isoformat() if review.created_at else None
#                 }

#             if review.updated_at:
#                 review_info['updated_at'] = review.updated_at.isoformat()
#                 return review_info, 200
#             else:
#                 return {'Error': 'Review not found'}, 404
#         except:
#             return {'Error': 'Error while updating review'}, 500

#     @login_required
#     def delete(self, review_id):
#         try:
#             user_id = current_user.id
#             review = Review.query.filter_by(id=review_id, user_id=user_id).first()
#             if review:
#                 db.session.delete(review)
#                 db.session.commit()
#                 return {}, 204
#             else:
#                 return {'Error': 'Review not found'}, 404
#         except:
#             return {'Error': 'Error occurred while deleting review'}, 500


# class AddReviewComment(Resource):
#     @login_required
#     def post(self, id):
#         if current_user:
#             data = request.get_json()
#             user_id = current_user.id
#             new_comment = Comment(
#                 # user_id=user_id,
#                 # thread_id=id,
#                 # description=data.get("description"),
#             )
#             try:
#                 db.session.add(new_comment)
#                 db.session.commit()
#             except:
#                 return {"error": "problem with posting comment"}, 400
#             return (new_comment), 201

# class LikeComments(Resource):
#     @login_required
#     def patch(self, id):
#         if current_user:
#             data = request.get_json()
#             comment = Comment.query.filter(Comment.id == id).first()
#             total_likes = comment.likes + 1
#             setattr(comment, "likes", total_likes)
#             print(comment)
#             try:
#                 db.session.add(comment)
#                 db.session.commit()
#             except:
#                 return {"error": "something went wrong with the comment"}, 400

#             return (comment), 201
# class UnlikeComments(Resource):
#     method_decorators = [login_required]

#     def patch(self, id):
#         if current_user:
#             data = request.get_json()
#             comment = Comment.query.filter(Comment.id == id).first()
#             total_likes = comment.likes - 1
#             setattr(comment, "likes", total_likes)
#             print(comment)
#             try:
#                 db.session.add(comment)
#                 db.session.commit()
#             except:
#                 return (
#                     {"error": "something went wrong with the comment"}
#                 ), 400

#             return (comment), 201

# class SearchProducts(Resource):
#     def get(self):
#         parser = reqparse.RequestParser()
#         parser.add_argument('query', type=str, required=True, help="Search query is required")
#         args = parser.parse_args()

#         query = args['query']
#         results = []

#         # Perform the search operation based on the query
#         for item in Product:
#             if query.lower() in item['name'].lower():
#                 results.append(item)

#         return {'results': results}


# api.add_resource(ProductReviews, '/reviews/product/<product_id>')
# api.add_resource(UserReview, '/reviews/<review_id>')


# api.add_resource(ReviewComments, '/comments')
# api.add_resource(LikeComments, "/like_comment/<int:id>")
# api.add_resource(UnlikeComments, "/unlike_comment/<int:id>")
# api.add_resource(SearchProducts, '/search')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
