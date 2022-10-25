export const handleChange = (evento, campo) => {
    setFormLogin({ ...formLogin, [campo]: evento.target.value })
}