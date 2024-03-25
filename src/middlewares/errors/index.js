import EErrors from "./enums.js";

export default (error, req, res, next) => {
    // Verificar si 'error' es una instancia de 'Error'
    if (!(error instanceof Error)) {
        // Si no es una instancia de 'Error', manejarlo como un error interno
        res.status(500).send({
            status: "error",
            error: "Internal Server Error",
            description: "An unexpected error occurred.",
        });
    } else {
        // Manejar el error según su código
        switch (error.code) {
            case EErrors.INVALID_TYPE_ERROR:
                res.status(400).send({
                    status: "error",
                    error: "Invalid Type Error",
                    description: error.message, // Usar 'error.message' en lugar de 'error.cause'
                });
                break;
            case EErrors.DATABASE_ERROR:
                // No es necesario manejar el error específicamente, ya que se manejará en el caso predeterminado
            default:
                // Manejar todos los otros errores como errores internos del servidor
                res.status(500).send({
                    status: "error",
                    error: "Internal Server Error",
                    description: error.message || "An unexpected error occurred.",
                });
                break;
        }
    }

    next();
};
