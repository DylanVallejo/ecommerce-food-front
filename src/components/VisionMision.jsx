import React from 'react'
import { Accordion,AccordionSummary, AccordionDetails,Typography } from '@mui/material'
import styles from "../styles/VisionMision.module.scss";


function VisionMision() {
  return (
      <div className={styles.nosotrosContainer}>
        <div className={styles.nosotrosInfo}>
          <Accordion color='none'>
              <AccordionSummary
                  id='panel1-header'
                  aria-controls='panel1-content'
                  expandIcon={<expandIcon />}>
                  <Typography>Historia</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <Typography>
                      El restaurante de comida rápida en Quito se fundó en 2018 con la misión de ofrecer a la ciudad comida rápida orgánica y de alta calidad. El restaurante fue fundado por un equipo de emprendedores locales que creían en una experiencia de comida rápida más saludable y sostenible.
                  </Typography>
              </AccordionDetails>
          </Accordion>
          <Accordion >
              <AccordionSummary
                  id='panel2-header'
                  aria-controls='panel2-content'
                  expandIcon={<expandIcon />}>
                  <Typography>Visión</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <Typography>
                  Nuestra visión es ser el principal destino de comida rápida de Quito, proporcionando una alternativa saludable y sostenible que sea deliciosa y asequible. Nos esforzamos por crear una experiencia memorable para nuestros clientes, ofreciendo ingredientes orgánicos de alta calidad y un servicio al cliente excepcional.
                  </Typography>
              </AccordionDetails>
          </Accordion>
          <Accordion>
              <AccordionSummary
                  id='panel2-header'
                  aria-controls='panel2-content'
                  expandIcon={<expandIcon />}>
                  <Typography>Misión</Typography>
              </AccordionSummary>
              <AccordionDetails>
                  <Typography>
                  Nuestra misión es proveer a la ciudad de Quito con deliciosa comida rápida orgánica que sea sostenible y asequible. Nos esforzamos por crear una experiencia agradable para nuestros clientes, ofreciendo ingredientes frescos y un servicio atento. Estamos comprometidos a mantener un enfoque ético y sostenible de nuestro negocio, y a tener un impacto positivo en la comunidad.
                  </Typography>
              </AccordionDetails>
          </Accordion>
          </div>
    </div>
  )
}

export default VisionMision