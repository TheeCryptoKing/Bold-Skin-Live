########################### imports ######################
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from flask_login import UserMixin
from sqlalchemy.orm import validates
from api.config import db, bcrypt
from datetime import datetime
import re

############################### Models #######################
# flask db revision --autogenerate -m 'updating Tables'
# flask db upgrade head 
# Change to u_ when fully functional

class User(db.Model, SerializerMixin, UserMixin):
    __tablename__ = 'users'
    ################################## Main Attributes
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String(128), nullable=False)
    # wishlists = db.Column(db.String)
    ############################# DateTime Specfics
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    ######################## FK
    # role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    #################### Relationships 
    # role = dbrelationship("Role", backref="user_role")
    orders = db.relationship("Order", back_populates='user')
    cart = db.relationship("Cart", uselist=False, back_populates="user", cascade="all, delete-orphan")
    payments = db.relationship("Payment", back_populates='user')
    # reviews = db.relationship("Review", back_populates='user', cascade="all, delete-orphan")
    # comments = db.relationship("Comment", back_populates='user', cascade="all, delete-orphan")
    addresses = db.relationship("Address", back_populates='user')
    ########### Validation & Seriaization
    serialize_rules = (
        # '-created_at',
        # '-updated_at',
        '-orders',
        # '-role',
        '-cart',
        '-payments',
        '-addresses',
        # '-reviews',
        # '-comments',
        )
    @validates('username')
    def vaidates_Uname(self, key, uname):
        if not uname and len(uname) <= 2:
            raise ValueError('Invalid Username Boss')
        return uname
    @validates('email')
    def validates_email(self, key, email):
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise ValueError('Invalid email Boss')
        return email
    # def validate_email(self, key, email):
    #     try:
    #         valid = validate_email(email)
    #         return valid.email
    #     except EmailNotValidError as e:
    #         raise ValueError('Invalid Email') from e
    
    # password hashing
    @hybrid_property
    def password_hash(self):
        raise Exception('Are you trying to berak Password hashes.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'
    ######################## Main Attributes
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=50)
    e_pitch = db.Column(db.String)
    description = db.Column(db.Text, nullable=False)
    image_1 = db.Column(db.String, nullable=False)
    image_2 = db.Column(db.String, nullable=True)
    background = db.Column(db.String, nullable=True)
    application = db.Column(db.String)
    ingredients = db.Column(db.Text)
    storage = db.Column(db.String)
    intiative = db.Column(db.String)
    ###################### DateTime Specfics
    ###################### FK
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id')) 
    ########################## Relationships 
    # Backref = automatically adds a new attribute to the target table's model, which provides access to related objects from the source table. 
    cartItems =  db.relationship("CartItem", back_populates="product")
    category = db.relationship("Category", back_populates="products")
    # reviews = db.relationship("Review", back_populates="product")
    order_items = db.relationship("OrderItems", back_populates="product")
    ####################### Validation & Serialization
    serialize_rules = (
        '-cartItems',
        '-cartItems.product',
        '-order_items',
        '-order_items.product',
        # STOP FUCKING WRITING THINGS IN UPPERCASE DESIGNER 
        # '-Prod_category.id',
        # '-Prod_category.name',
        # '-Prod_category.product_category',
        '-category',
        '-category.products',
        '-category_id',
        )
    # serialize_only = ('id','name','price','quantity','e_pitch','description','image_1','image_2','application','ingredients','storage','intiative')

class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'
    ####################### Main Attributes
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    ####################### Relationships
    ######################## Validation & Serialization
    products = db.relationship("Product", back_populates="category")
    serialize_rules=('-products','-product.category')



class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'
    ####################### Main Attributes
    id = db.Column(db.Integer, primary_key=True)
    order_total = db.Column(db.Integer, nullable=False)
    ###################### DateTime Specfics
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    ###################### FK
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    status_id = db.Column(db.Integer, db.ForeignKey("order_status.id"))
    ########################## Relationships
    user = db.relationship("User", back_populates="orders")
    order_items = db.relationship("OrderItems", back_populates="orders")
    status = db.relationship("OrderStatus", backref="order_status")
    ####################### Validation & Serialization
    serialize_rules = (
        '-user',
        '-order_items',
        '-status'
    #     '-Prod_reviews',
        )

class OrderItems(db.Model, SerializerMixin):
    __tablename__ = 'order_items'
    ####################### Main Attributes
    id = db.Column(db.Integer, primary_key=True)
    num_of_items = db.Column(db.Integer, nullable=False)
    items_price = db.Column(db.Integer, nullable=False)
    ###################### DateTime Specfics
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    ###################### FK
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id')) 
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    ###################### Relationships
    orders = db.relationship("Order", back_populates="order_items")
    product = db.relationship("Product", back_populates="order_items")
    ####################### Validation & Serialization
    serialize_rules = (
        '-orders',
        '-orders.order_items',
        '-product',
        '-product.order_items'
        )

class OrderStatus(db.Model, SerializerMixin):
    __tablename__ = 'order_status'
    ####################### Main Attributes
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String, nullable=False, unique=True)
    ###################### DateTime Specfics
    ###################### Relationships
    ####################### Validation & Serialization
    serialize_rules = ('-order_status','-order_status.status',)
    def to_dict(self):
        return {
            "id": self.id,
            "status": self.order_status
        }
    # serialize_only = ('id','status',)
    # def to_dict(self):
    #     serialized_data = {attr: getattr(self, attr) for attr in self.serialize_only}
    #     return serialized_data


class Cart(db.Model, SerializerMixin):
    __tablename__ = 'cartstuff'
    ######################## Main Attributes
    id = db.Column(db.Integer, primary_key=True)
    ####################### DateTime Specfics
    ####################### FK
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    ########################### Relationships
    user = db.relationship("User", back_populates="cart")
    cartItems = db.relationship("CartItem", back_populates='cart')
    ######################## Validation & Serialization
    serialize_rules = (
        '-user',
        '-cartItems',
        )


class CartItem(db.Model, SerializerMixin):
    __tablename__ = 'cart_items'
    ######################## Main Attributes
    id = db.Column(db.Integer, primary_key=True)
    # cart_quantity = db.Column(db.Integer)
    quantity = db.Column(db.Integer, nullable=False)
    ####################### DateTime Specfics
    ####################### FK
    cart_id = db.Column(db.Integer, db.ForeignKey('cartstuff.id')) 
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    ########################### Relationships
    cart = db.relationship("Cart", back_populates="cartItems")
    product = db.relationship("Product", back_populates="cartItems")
    ######################## Validation & Serialization
    serialize_rules = (
        '-cart',
        '-product'
        )




#################### Advanced ####################
class Payment(db.Model, SerializerMixin):
    __tablename__ = 'payments'
    ######################## Main Attributes
    id = db.Column(db.Integer, primary_key=True)
    card_number = db.Column(db.Integer, nullable=False)
    cardholder_name = db.Column(db.String, nullable=False)
    expiration_month = db.Column(db.Integer, nullable=False)
    expiration_year = db.Column(db.Integer, nullable=False)
    cvv = db.Column(db.Integer, nullable=False)
    ####################### DateTime Specfics
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    ####################### FK
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    ####################### Relationships
    user = db.relationship("User", back_populates='payments')
    ######################## Validation & Serialization
    @validates('card_number')
    def validate_card_number(self, key, card_number):
        if not card_number or card_number.isspace():
            raise ValueError("Card number required.")

        if not re.match(r'^[0-9]{16}$', card_number):
            raise ValueError("Invalid card.")
        return card_number

    @validates('cardholder_name')
    def validate_cardholder_name(self, key, cardholder_name):
        if not cardholder_name or cardholder_name.isspace():
            # isspace() = checking for whitespace
            raise ValueError("Cardholder name required.")
        return cardholder_name

    @validates('expiration_month')
    def validate_expiration_month(self, key, expiration_month):
        if expiration_month < 1 or expiration_month > 12:
            raise ValueError("Invalid expiration month.")
        return expiration_month
    # Fix logic for backend

    @validates('expiration_year')
    def validate_expiration_year(self, key, expiration_year):
        current_year = datetime.now().year
        if expiration_year < current_year or expiration_year > (current_year + 10):
            raise ValueError("Invalid expiration year.")
        return expiration_year
    # Fix logic for backend

# class Review(db.Model, SerializerMixin):
#     __tablename__ = 'reviews'
#     ######################## Main Attributes
#     id = db.Column(db.Integer, primary_key=True)
#     review_rating = db.Column(db.String, nullable=False) 
#     review_text = db.Column(db.String, nullable=False)
#     ####################### DateTime Specfics
#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate=db.func.now())
#     ####################### FK
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
#     ####################### Relationships
#     user = db.relationship("User", back_populates="reviews")
#     product = db.relationship("Product", back_populates="reviews")
#     comments = db.relationship("Comment", back_populates='review', cascade="all, delete-orphan")
#     ######################## Validation & Serialization
#     @validates('review_rating')
#     def validate_rating(self, key, rating):
#         if not rating or rating < 0 or rating > 5:
#             raise ValueError('Invalid rating, needs to be between 0 and 5')
#         return rating
    
#     @validates('review_text')
#     def validate_review_text(self, key, review_text):
#         if not review_text.strip():
#             raise ValueError('Invalid review')
#         return review_text
    
#     @validates("user_id")
#     def validate_user(self, key, user_id):
#         if not user_id or not isinstance(user_id, int):
#             raise ValueError("Invalid user id")
#         return user_id
    
#     @validates("product_id")
#     def validate_product(self, key, product_id):
#         if not product_id or not isinstance(product_id, int):
#             raise ValueError("Invalid product id")
#         return product_id
    
    

# class Comment(db.Model, SerializerMixin):
#     __tablename__ = 'comments'
#     ######################## Main Attributes
#     id = db.Column(db.Integer, nullable=False, primary_key=True)
#     user_comment = db.Column(db.Text, nullable=True)
#     likes = db.Column(db.Integer, default=0)
#     ####################### DateTime Specfics
#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate=db.func.now())
#     ####################### FK
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id')) 
#     review_id = db.Column(db.Integer, db.ForeignKey('reviews.id')) 
#     ####################### Relationships
#     review = db.relationship("Review", back_populates="comments")
#     user = db.relationship("User", back_populates="comments")
#     ######################## Validation & Serialization
#     # serialize_rules = ('-created_at','-updated_at','',)
#     @validates('user_comment')
#     def validate_Ucomment(self, key, comment):
#         if not comment.strip():
#             raise ValueError('Invalid comments')
#         return comment
    
#     @validates("user_id")
#     def validate_user(self, key, user_id):
#         if not user_id or not isinstance(user_id, int):
#             raise ValueError("Invalid user id")
#         return user_id
    
#     @validates("review_id")
#     def validate_product(self, key, review_id):
#         if not review_id or not isinstance(review_id, int):
#             raise ValueError("Invalid review id")
#         return review_id
    
    

class Address(db.Model, SerializerMixin):
    __tablename__ = 'addresses'
    ######################## Main Attributes
    id = db.Column(db.Integer, primary_key=True)
    address_1 = db.Column(db.String, nullable=False)
    address_2 = db.Column(db.String, nullable=True)
    address_city = db.Column(db.String, nullable=False)
    address_state = db.Column(db.String, nullable=False)
    address_postal = db.Column(db.Integer, nullable=False)
    address_type_of = db.Column(db.String, nullable=False)
    ####################### DateTime Specfics
    ####################### FK
    user_id = db.Column(db.Integer, db.ForeignKey('users.id')) 
    ####################### Relationships
    user = db.relationship("User", back_populates="addresses")
    ######################## Validation & Serialization
    serialize_rules = ("-user",)
    @validates('address_postal')
    def validate_address_postal(self, key, address_postal):
        pattern = r'^\d{5}$'

        if not re.match(pattern, str(address_postal)):
            raise ValueError('Invalid postal code.')

        return address_postal

    @validates('address_state')
    def validate_state(self, key, state):
        valid_states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA',
                        'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
                        'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT',
                        'VA', 'WA', 'WV', 'WI', 'WY']
        if state not in valid_states:
            raise ValueError('Invalid state,')
        return state

    @validates('address_1', 'address_city', 'address_type_of')
    def validate_non_empty_fields(self, key, value):
        if value is not None and not value.strip():
            raise ValueError("Field must cannot be empty.")
        return value

# Unsure if needed
# class Role(db.Model, SerializerMixin):
    # Table might not be needed 
    # __tablename__ = 'roles'
    ######################## Main Attributes
    # id = db.Column(db.Integer, primary_key=True)
    # roles = db.Column(db.String, nullable=True)
    ####################### Relationships
    # users = db.relationship("User", backref="to_be_Admin") 
    ######################## Validation & Serialization
    # serialize_rules = ('',)
    # @validations('')