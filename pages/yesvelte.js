import { Accordion, AccordionBody, Accordions } from "../components/Accordion.js"

export default () => {
    
    return Accordions({
        persistent: false,
        slot: [
            Accordion({
                title: 'Hello accordion',
                slot: AccordionBody({
                    slot: 'Hello'
                })
            }),
            Accordion({
                title: 'Hello accordion',
                slot: AccordionBody({
                    slot: 'Hello'
                })
            }),
            Accordion({
                title: 'Hello accordion',
                slot: AccordionBody({
                    slot: 'Hello'
                })
            })
        ]
    })
}