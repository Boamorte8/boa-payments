## Description
Aplication to save and check to follow your debts and loans

<br/>
<br/>

## 📕 Definitions
- **Loan**: Una deuda que se le ha hecho a un usuario o entidad.
- **Debt**: Es el  usuario.

<br/>
<br/>

<!-- Without finished -->
## 📋 Functional Requirements

### Inicio de sesión

- El usuario podrá iniciar sesión en la plataforma mediante un nombre de usuario y una contraseña
- El usuario estará previamente registrado en el sistema, y no se podrán registrar nuevos usuarios.

### Creación de publicaciones
- El usuario podrá crear publicaciones
- Las publicaciones podrán ser publicadas en el momento de su creación
- Las publicaciones podrán ser programadas para su publicación en una fecha y hora concretas
- La programación de publicaciones puede realizarse en el momento de su creación, o con posterioridad
- En caso de que una publicación no haya sido publicada, ni programada para su publicación, se marcará como borrador
- El usuario podrá crear un número ilimitado de publicaciones en borrador
- El usuario podrá programar un número ilimitado de publicaciones

### Edición de publicaciones
- El usuario podrá editar una publicación creada, siempre que esta no haya sido publicada.
- El usuario podrá eliminar una publicación creada, siempre que esta no haya sido publicada.

###  Listado de publicaciones
- El usuario podrá listar las publicaciones creadas, independientemente de su estado
- El usuario podrá ordenar las publicaciones creadas por su fecha de publicación / programación.
- El usuario podrá filtrar el listado de publicaciones en base a su estado (borrador, programado, publicado)

### Redes sociales
- Las publicaciones podrán publicarse únicamente en la red social Twitter
- Un usuario sólo puede vincular y realizar publicaciones para una única cuenta de la red social