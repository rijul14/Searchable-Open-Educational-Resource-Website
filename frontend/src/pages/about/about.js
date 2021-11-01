import React from "react";
import "./about.css"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.handleLinkOne = this.handleLinkOne.bind(this);
        this.handleLinkTwo = this.handleLinkTwo.bind(this);
        this.handleLinkThree = this.handleLinkThree.bind(this);
    }

    handleLinkOne() {
        this.setState({open: !this.state.open});
    }
    handleLinkTwo() {
        this.setState({open: !this.state.open});
    }
    handleLinkThree() {
        this.setState({open: !this.state.open});
    }

    render() {
        return (
            <div className="body-about">
            <p>¿Quiénes somos?</p>
            <div className="info-about">
                <p>
                    OERinspanish es una plataforma de recursos educacionales en español gratuitos, 
                    única en su género al ofrecer materiales creados tanto por estudiantes participantes 
                    en el programa de servicio comunitario <a class="inTextLink" onClick={this.handleLinkOne} > Feliz en la Comunidad </a> como 
                    por <a class="inTextLink" onClick={this.handleLinkTwo} >instructores de la Universidad de California del Sur (USC)</a>.
                    La esperanza detrás del proyecto es beneficiar a la comunidad más allá del entorno 
                    universitario y permitir el intercambio de conocimientos fuera de los límites 
                    tradicionales del aula de clase. Los interesados podrán leer, descargar, copiar, 
                    imprimir o enlazar los textos completos de estas unidades citando la fuente o autor/es.
                </p>
            </div>

            <p>Contacto</p>
            <div className="info-about">
                <p>
                    oerin.spanish@usc.edu
                </p>
            </div>

            <p>Futuras Colaboraciones</p>
            <div className="info-about">
                <p>
                    Si tienen ideas, sugerencias o comentarios, por favor, contáctenos. oerinspanish@usc.edu
                </p>
            </div>

            <Dialog
                    open={this.state.open}
                    onClose={this.handleLinkOne}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Feliz en la Comunidad"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        Feliz en la Comunidad es un programa de alcance comunitario que, desde 2014, 
                        permite a los estudiantes de español de niveles intermedios y avanzados de la 
                        Universidad de California del Sur colaborar con escuelas del área metropolitana de Los Ángeles. 
                        A través de este programa de aprendizaje y servicio, los estudiantes practican español 
                        y sus habilidades de liderazgo mientras establecen conexiones con vecindarios cultural y 
                        socialmente diversos de Los Ángeles. Durante su participación, los estudiantes de USC 
                        crean materiales que posteriormente son compartidos con <a class="inTextLink" onClick={this.handleLinkThree}>centros colaboradores</a>
                        a través de nuestra plataforma o a través de visitas en persona a diversos centros colaboradores. 
 	                    Los interesados podrán leer, descargar, copiar, imprimir o enlazar los textos completos de estas 
                         unidades citando la fuente o autor/es.
                        </DialogContentText>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleLinkThree}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Centros colaboradores"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        CALCREATIVE:<br/>
                        https://calcreative.org/about/us/<br/><br/>

                        USC HYBRID HIGH SCHOOL:<br/>
                        https://www.ednovate.org/hybrid<br/><br/>

                        JOHN MUIR ELEMENTARY SCHOOL (GLENDALE)<br/>
                        https://www.gusd.net/muir<br/><br/>

                        LARCHMONT CHARTER SCHOOL (LAFAYETTE PARK CAMPUS)<br/>
                        https://www.larchmontcharter.org/lfp-campus<br/><br/>

                        INTERNATIONAL SPANISH ACADEMY (LOS ÁNGELES)<br/>
                        https://www.educacionyfp.gob.es/eeuu/en/convocatorias-programas/convocatorias-eeuu/isa.html<br/><br/>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleLinkTwo}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Materiales creados por instructores de la Universidad de California del Sur"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        Creado por el profesorado del programa básico de enseñanza del español  del Departamento de 
                        Culturas Latinoamericanas e Ibéricas de la Universidad del Sur de California, este repositorio 
                        hace accesibles materiales didácticos desde la óptica de la interacción entre la lengua española, 
                        la cultura hispana y la práctica docente. A partir de su vasta experiencia en el aula, el profesorado 
                        ha creado unidades que dan cobertura a una amplia variedad temática, centrándose en el desarrollo de 
                        diferentes destrezas de la lengua española. El objetivo es promover el pensamiento crítico y el intercambio 
                        de ideas y opiniones entre el alumnado, así como facilitar la comprensión de aspectos y convenciones 
                        socio-culturales del mundo hispano. Cada una de las unidades está etiquetada con metas educativas, estructuras 
                        gramaticales y el nivel. Los interesados podrán leer, descargar, copiar, imprimir o enlazar los textos completos 
                        de estas unidades citando la fuente o autor/es.
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            
        </div>
        );
    }
}
