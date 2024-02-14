import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate} from "react-router-dom";


function HairGrowth() {
  //   const[hairGrowth, setHairGrowth] = useState()
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch("/products");
  //         const data = await response.json();
  //         setHairGrowth(data);
  //       } catch (error) {
  //         console.error("Error fetching Hair growth oil:", error);
  //       }
  //     };
  
  //     fetchData();
  
  //     const reveal = () => {
  //       const reveals = document.querySelectorAll(".reveal");
  
  //       for (let i = 0; i < reveals.length; i++) {
  //         const windowHeight = window.innerHeight;
  //         const elementTop = reveals[i].getBoundingClientRect().top;
  //         const elementVisible = 150;
  
  //         if (elementTop < windowHeight - elementVisible) {
  //           reveals[i].classList.add("active");
  //         } else {
  //           reveals[i].classList.remove("active");
  //         }
  //       }
  //     };
  
  //     window.addEventListener("scroll", reveal);
  
  //     // Clean up the event listener
  //     return () => {
  //       window.removeEventListener("scroll", reveal);
  //     };
  //   }, []);
  
  //   function handleNavigate() {
  //     navigate('/product/16');
  //   }
  //     // if (category === "Hair Growth") {
  //     //   return navigate("/HairGrowth")
  //     //   }


  // return (
  //   <div>
  //   <div className='hair-jumbotron pacifico-bold-white'>
  //   Male Patterned Baldness Plague's <br/>
  //   Approximately 95% of men. <br/>
  //   <h2 className="lgMT">we would like to help with that.</h2>
  //   </div>
  //   <Container>
  //   <section>
  //     <div className="statistics reveal mdMT">
  //       The statistics and Data are real <br/>
  //       it accounts for more than 95% of hair loss in men. (i.e. webMD) By age 35, two-thirds of American men will have some degree of appreciable hair loss and by age 50 approximately 85% of men have significantly thinning hair. <br/>
  //       <h1 className="title-text mdMT">Even Jeff Bezo's Billion's couldn't grow his hair back... <br /></h1>
  //       <h3 className="pacifico-reg mdMT">Or so we thought, until we did the research ... </h3>
  //     </div>
  //     </section>
  //     <section>
  //     <Row className='center reveal'>
  //       <Col>
  //         <h3 className="title-text">Researchers found in this study, which compared Rosemary Oil to Minoxidil (the active ingredient in Rogaine) that the natural remedy was just as effective OTC drug. Caffeine can help decrease DHT and increase growth factors as shown in this study. <br/> In another study they even boldly state in their title that "Peppermint Oil Promotes Hair Growth Without Toxic Signs"! <br/>There was even a randomized double blind trial that showed lavender, rosemary, thyme, cedarwood essential oils to be a safe and effective treatment of Alopecia Areata! <br/> Pumpkin seed oil can help reduce DHT and the study shows that it “provides evidence of a promising potential role of PSO in treating Female Pattern Hair Loss”. This shows us that natural remedies can be just as effective than the OTC in helping to promote hair growth and prevent hair loss! via(https://pubmed.ncbi.nlm.nih.gov/25842469/)</h3>
  //       </Col>
  //       <Col className="hair_jimmy">
  //           <img src="https://images.unsplash.com/photo-1573575154488-f88a60e170df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"/>
  //       </Col>
  //     </Row>
  //     </section>
  //     <section>
  //     <Row className=" statistics reveal">
  //       We have been working, hard and attenitvely to create, package, and deliver a sustainable product that will create full, strong hair naturally with clinically proven ingredients! Formulated with only 8 ORGANIC  ingredients, in a 100% sustainable package. 
  //       Our small batch process ensures that the ingredients stay nutrient dense.
  //       Sustainably hand blended and bottled in California for a better future.
  //       Each bottle is good for one year after opening.
  //     </Row>
  //     </section>
  //     <section>
  //     <Row className="lgMT reveal">
  //     <h1 className="title-text">Introducing..</h1>
  //     <h1 className="title-text reveal"> Our Brand New Bold Hair Oil </h1>
  //     <p className="hair-jimmy reveal">
  //     <img src="https://raw.githubusercontent.com/TheeCryptoKing/Bold-Skin/testbranch/assets/Products/HairGrowth/Hair_Growth_Oils.png"/>
  //     <h3 className="statistics reveal">Formulated to be suitable for all hair types, skin types, and genders.<br/> Rosemary, Pumpkin Seed Oil, and Caffeine have been studied for their efficacy for promoting hair growth and blocking DHT which can prevent hair loss! Tea Tree and Lavender are known for their anti-bacterial and anti-inflammatory properties which can help with overall scalp health.<br/> A healthy scalp is crucial to a healthy head of hair! It can also be used to maintain a healthy head of hair! <br/> Simply massage it into your scalp and enjoy the simple pleasures of giving yourself a little head rub .</h3>
  //     </p>
  //     <Button 
  //       variant="danger" 
  //       className="edit-profile-button mdMB reveal smMT"
  //       onClick = {handleNavigate}
  //       >
  //       Purchase here
  //     </Button>
  //     </Row>
  //     </section>
  //     <section>
  //     <Row>
  //       <h3 className="statistics mdMT reveal"> There are also Several other ways to promote Hair Growth</h3>
  //       <h4 className="statistics reveal"> One way that has naturally given results are healthy massages, How should you preform these massages you ask? </h4>
  //       <h5 className="reveal statistics text-center mdMB mdMT">In indian Culture their is a massage know as the "Ayurvedic Indian Pressure Point Head Massage". Which target's the 108 important pressure points known as the “Marmas,” 31 of which are located in the head area.</h5>
  //       <h3 className=" text-center title-text reveal mdMB">You want to massage all of the pressure points detailed below for maximum hair growth in small circles Eveyday for 5 minutes upon wakeup and right before bed. </h3>
  //       <img className="hair-jimmy reveal" src="https://4.bp.blogspot.com/-T1Ii6GfyOUQ/UuVXsH2w9dI/AAAAAAAAAFQ/wJN8DhdaF5I/s1600/Pressure,+Point,+Scalp,+Massage,+relax,+london,+pottersbar,+herts,+hertfordshire,+beauty,+professional.gif"/>
  //     </Row>
  //     </section>
  //     <Row>
  //       <h1 className="title-text text-center reveal mdMB">Yoga is also a great alternative, Not sure if your masculinity will appreciate some of the Positions</h1><h2 className="statistics reveal mdMB"> That being said we promise their are a ton of success stories. The goal is to get blood flow into the scalp. When you get a chance. Search The below Yoga positions and see the results for yourself </h2>
  //       <ul className="ul-text mdMT mdMB reveal">
  //         <li> Kapalabhati. </li>
  //         <li> Adho Mukha Svanasana. </li>
  //         <li> Sarvangasana. </li>
  //         <li> Balasana. </li>
  //         <li> Sirsasana. </li>
  //         <li> Vajrasana. </li>
  //         <li> Uttanasana. </li>
  //         <li> Matsyasana. </li>
  //       </ul>
  //     </Row>
  //   </Container>
  //   </div>
  // )
}

export default HairGrowth