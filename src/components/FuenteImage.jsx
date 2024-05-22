const getImageSource = (category) => {
    switch(category) {
        case "CHAPERIA":
            return require('../../assets/chaperia.jpg');
        case "OPTICAS":
            return require('../../assets/opticas.png');
        case "MOTOR":
            return require('../../assets/motor.png');
        case "INYECCIÓN":
            return require('../../assets/inyeccion.png');
        case "TUNING":
            return require('../../assets/tuning.png');
        default:
            return null;
    }
}


export default getImageSource; 