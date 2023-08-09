  import style from "./Form.module.css"
  import { useForm } from "react-hook-form";

  const Form = () => {

    const { 
        register, //actua como el useState
        handleSubmit, //es una funcion y es igual al handleSubmit antiguo
        formState: {errors}, //es un objeto y es para manejar los errores 
        watch, //es una funcion y sirve para saber el value de cada input
        setValue, //es una funcion y sirve para asignar values por defecto
        reset, //es una funcion y sirve para resetear o limpiar el formulario cuando se envia
    } = useForm();


    const onSubmit = handleSubmit((data) => {
        alert("datos enviados con exito")
        reset()
    })

    return (
        <div className={style.container}>
            <form onSubmit={onSubmit}>

                {/*----------------------- nombre ---------------------*/}
                <label htmlFor="nombre">Nombre</label>
                <input 
                    type="text" 
                    { ...register("nombre", {
                        required: {
                            value: true,
                            message: "Nombre es requerido"
                        },
                        minLength: {
                            value: 2,
                            message: "Nombre debe tener al menos 2 caracteres"
                        },
                        maxLength: {
                            value: 20,
                            message: "Nombre debe tener maximo 20 caracteres"
                        }
                    }) }
                />
                { errors.nombre && <span>{errors.nombre.message}</span> }

                {/*----------------------- correo -----------------------*/}
                <label htmlFor="correo">Correo</label>
                <input 
                    type="email" 
                    { ...register("email", {
                        required: {
                            value: true,
                            message: "Email es requerido"
                        },
                        pattern: { //sirve para poner los regex
                            value: /\S+@\S+\.\S+/,
                            message: "Email no es valido"
                        }

                    }) }
                />
                { errors.email && <span>{errors.email.message}</span>}

                {/*----------------------- password -----------------------*/}
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    { ...register("password", {
                        required: {
                            value: true,
                            message: "Password es requerida"
                        },
                        minLength: {
                            value: 6,
                            message: "La password debe tener al menos 6 caracteres"
                        }
                    }) }
                />
                { errors.password && <span>{errors.password.message}</span>}

                {/*----------------------- confirmar password -----------------------*/}
                <label htmlFor="confirmarPassword">Confirmar Password</label>
                <input 
                    type="password" 
                    { ...register("confirmarPassword", {
                        required: {
                            value: true,
                            message: "confirmar password es requerido"
                        },
                        validate: (value) => value === watch("password") || "Los passwords no coinciden"
                    }) }    
                />
                { errors.confirmarPassword && <span>{errors.confirmarPassword.message}</span>}

                {/*----------------------- fecha de nacimiento -----------------------*/}
                <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                <input 
                    type="date"
                    { ...register("fechaNacimiento", {
                        required: {
                            value: true,
                            message: "Fecha de nacimiento es requerida"
                        },
                        validate: (value) => {
                            const fechaNacimiento = new Date(value)
                            const fechaActual = new Date()
                            const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear() //getFullYear() -> me da el año
                            return edad >= 18 || "Debe ser mayor de edad"
                        }
                    }) } 
                />
                { errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>}

                {/*----------------------- pais -----------------------*/}
                <label htmlFor="pais">Pais</label>
                <select 
                    { ...register("pais") }
                >
                    <option value="mx">México</option>
                    <option value="co">Colombia</option>
                    <option value="ar">Argentina</option>
                </select>
                {   // crear un input nuevo para cuando se escoge la opcion Argentina
                    watch("pais") === "ar" && ( 
                        <>
                            <input 
                                type="text"
                                placeholder="Provincia"
                                { ...register("provincia", {
                                    required: {
                                        value: true,
                                        message: "Provincia es requerida"
                                    }
                                })}
                            />
                            { errors.provincia && <span>{errors.provincia.message}</span>}

                        </>
                    )
                }

                {/*----------------------- file -----------------------*/}
                <label htmlFor="foto">Foto de perfil</label>
                <input 
                    type="file" 
                    onChange={(event) => {
                        setValue("fotoDelUsuario", event.target.files[0].name)
                    }}    
                />

                {/*----------------------- terminos y condiciones -----------------------*/}
                <label htmlFor="terminos">Acepto terminos y condiciones</label>
                <input 
                    type="checkbox" 
                    { ...register("terminos", {
                        required: {
                            value: true,
                            message: 'Debes aceptar los términos'
                        }
                    }) }
                />
                { errors.terminos && <span>{errors.terminos.message}</span>}


                <button>Enviar</button>

            </form>

            {/*----------------------- ver el JSON con los datos -----------------------*/}
            <pre>
                {JSON.stringify(watch(), null, 2)}
            </pre>
        </div>
    )
  }

export default Form;