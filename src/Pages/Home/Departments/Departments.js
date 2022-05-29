import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Container, Grid, Typography } from '@mui/material';
import MuiToggleButton from "@mui/material/ToggleButton";
import cardiologyDept from '../../../assets/cardiology-dept.jpg';
import radiologyDept from '../../../assets/radiology-dept.jpg';
import neurologyDept from '../../../assets/neurology-dept.jpg';
import dermatologyDept from '../../../assets/dermatology-dept.jpg';
import dentistDept from '../../../assets/dentist-dept.jpg';
import pediatricsDept from '../../../assets/pediatrics-dept.jpg';

const Departments = () => {

    const departments = [
        {
            name: 'Cardiology',
            description: 'Cardiology is the study and treatment of disorders of the heart and the blood vessels. A person with heart disease or cardiovascular disease may be referred to a cardiologist. Cardiology is a branch of internal medicine. A cardiologist is not the same as a cardiac surgeon. A cardiac surgeon opens the chest and performs heart surgery. A cardiologist specializes in diagnosing and treating diseases of the cardiovascular system. The cardiologist will carry out tests, and they may perform some procedures, such as heart catheterizations, angioplasty, or inserting a pacemaker. Heart disease relates specifically to the heart, while cardiovascular disease affects the heart, the blood vessels, or both. To become a cardiologist in the United States, it is necessary to complete 4 years of medical school, 3 years of training in internal medicine, and at least 3 years specializing in cardiology.',
            image: cardiologyDept
            
        },

        {
            name: 'Radiology',
            description: 'Radiology is the medical discipline that uses medical imaging to diagnose and treat diseases within the bodies of animals and humans. A variety of imaging techniques such as X-ray radiography, ultrasound, computed tomography (CT), nuclear medicine including positron emission tomography (PET), fluoroscopy, and magnetic resonance imaging (MRI) are used to diagnose or treat diseases. Interventional radiology is the performance of usually minimally invasive medical procedures with the guidance of imaging technologies such as those mentioned above. The modern practice of radiology involves several different healthcare professions working as a team. The radiologist is a medical doctor who has completed the appropriate post-graduate training and interprets medical images, communicates these findings to other physicians by means of a report or verbally, and uses imaging to perform minimally invasive medical procedures.',
            image: radiologyDept
            
        },
        {
            name: 'Neurology',
            description: 'Neurology is a branch of medicine dealing with disorders of the nervous system. Neurology deals with the diagnosis and treatment of all categories of conditions and disease involving the central and peripheral nervous systems (and their subdivisions, the autonomic and somatic nervous systems), including their coverings, blood vessels, and all effector tissue, such as muscle. Neurological practice relies heavily on the field of neuroscience, the scientific study of the nervous system.A neurologist is a physician specializing in neurology and trained to investigate, or diagnose and treat neurological disorders.Neurologists treat a myriad of neurologic conditions, including stroke, seizures, movement disorders such as Parkinsons disease, autoimmune neurologic disorders such as multiple sclerosis, headache disorders like migraine and dementias such as Alzheimers disease.',
            image: neurologyDept
            
        }, 
        {
            name: 'Dermatology',
            description: 'Dermatology is the branch of medicine dealing with the skin. It is a speciality with both medical and surgical aspects.The skin is an incredible organ. It is your first line of defense against disease, protects your other organs, warms you up and cools you down, and sends messages about how healthy you are inside. Dermatologists are expert medical doctors and skin surgeons with the unique skills and experience to offer the best care for the organ that cares for you.Dermatologists have extensive training, going to school for 12 years or more to learn to diagnose and treat more than 3,000 diseases of the skin, hair, and nails as well as cosmetic concerns. Patients see dermatologists for issues that are much more than skin deep. Problems with their skin can harm patients sense of self-worth, create discomfort that can make everyday activities difficult, and, in some instances, threaten lives.',
            image: dermatologyDept
            
        }, 
        {
            name: 'Dentist',
            description: 'Dentistry is the diagnosis, treatment, and prevention of conditions, disorders, and diseases of the teeth, gums, mouth, and jaw. Often considered necessary for complete oral health, dentistry can have an impact on the health of your entire body. Dentists are trained professionals who help care for the teeth and mouth. Regularly seeing a dentist can help you to maintain a good level of dental health, which may have a direct impact on your overall well-being. A dentist has many responsibilities, and one of the most important is promoting good dental hygiene. This helps to prevent complications in your mouth or other parts of the body. A dentist also diagnoses and treats problems of the gums, teeth, and mouth. Dentists use modern technology and equipment like X-ray machines, lasers, drills, brushes, scalpels, and other medical tools when performing dental procedures.',
            image: dentistDept
            
        }, 
        {
            name: 'Pediatrics',
            description: 'Pediatrics is the branch of medicine dealing with the health and medical care of infants, children, and adolescents from birth up to the age of 18. The word “paediatrics” means “healer of children”; they are derived from two Greek words: (pais = child) and (iatros = doctor or healer). Paediatrics is a relatively new medical specialty, developing only in the mid-19th century. Abraham Jacobi (1830–1919) is known as the father of paediatrics. A paediatrician is a childs physician who provides not only medical care for children who are acutely or chronically ill but also preventive health services for healthy children. A paediatrician manages physical, mental, and emotional well-being of the children under their care at every stage of development, in both sickness and health.A paediatrician is a graduate from a medical school first. They learn about caring for infant, child, adolescent, and young adults during this period.',
            image: pediatricsDept
            
        }, 
        
    ]
    
    const ToggleButton = styled(MuiToggleButton)({
        color: "#fff",
        backgroundColor: '#1CC7D0',
        margin:'5px',
        transition: '.5s',
        fontWeight:'500',
        fontSize:'20px',
        "&.MuiButtonBase-root:hover": {
            backgroundColor: "green"
            
          },
        "&.Mui-selected, &.Mui-selected:hover": {
          color: "white",
          backgroundColor: 'green'
        }
      });
    const [alignment, setAlignment] = useState('Cardiology');
    const [newAlignmen, setNewAlignmen] = useState(alignment);


  const handleAlignment = (event, newAlignment) => {
      if(newAlignment !== null) {
        setAlignment(newAlignment);
      }
    event.preventDefault();
  }

  console.log(alignment);
    return (
        <Container sx={{ flexGrow: 1, padding:'60px 0 60px 0'}} id='departments'>
            <Typography variant="h3" textAlign='center' component="div" marginBottom="50px" textTransform='uppercase' fontWeight='700'>
                Our Departments
            </Typography>
            <div style={{display:'flex', justifyContent:'center'}}>
                <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    sx={{display:'inline-block', textAlign:'center'}}
                    aria-label="text alignment"
                >
                    <ToggleButton style={{border:0, borderRadius:'3px'}} value="Cardiology">CARDIOLOGY</ToggleButton>
                    <ToggleButton style={{border:0, borderRadius:'3px'}} value="Radiology">RADIOLOGY</ToggleButton>
                    <ToggleButton style={{border:0, borderRadius:'3px'}} value="Neurology">NEUROLOGY</ToggleButton>
                    <ToggleButton style={{border:0, borderRadius:'3px'}} value="Dermatology">DERMATOLOGY</ToggleButton>
                    <ToggleButton style={{border:0, borderRadius:'3px'}} value="Dentist">DENTIST</ToggleButton>
                    <ToggleButton style={{border:0, borderRadius:'3px'}} value="Pediatrics">PEDIATRICS</ToggleButton>
                </ToggleButtonGroup>
            </div>

            
            {departments.map((department,index) => 
                department.name === alignment &&
                <Grid container spacing={{ xs: 2, md: 3 }} p={3} display='flex' justifyContent='center' alignItems='center'>
                    <Grid item xs={12} sm={12} md={6} lg={6} sx={{textAlign:'justify'}} >
                        <div className='alignCenter' >
                        <h2>{department.name}</h2>
                        <p>{department.description}</p>
                        </div>
                        
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} mt={3}>
                        <img src={department.image} alt=""  width='100%' />
                    </Grid>
                </Grid>
                
            )}
           
           

           
        </Container>
    );
};

export default Departments;