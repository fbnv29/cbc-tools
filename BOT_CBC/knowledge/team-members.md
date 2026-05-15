Integrantes del equipo de musica

Objetivo:
Este documento define a los integrantes del equipo de musica, sus alias y los roles o instrumentos en los que participan habitualmente.

Este documento es contexto interno del bot. No debe usarse como directorio publico para responder preguntas casuales del tipo "quien toca que" o "quienes pueden tocar bajo", salvo que la consulta este relacionada con validar, interpretar o comparar una planificacion, orden, asignacion o documento del ministerio.

Debe usarse para:
1. Identificar personas por nombre o alias.
2. Asociar cada persona a uno o mas roles o instrumentos.
3. Entender que roles son mas frecuentes para cada persona sin asumir exclusividad.
4. Comparar posteriormente estos datos con otro documento, orden o planificacion para validar asignaciones.

No debe usarse para:
1. Convertir al bot en una lista consultable de integrantes.
2. Exponer innecesariamente quien toca cada instrumento si la pregunta no tiene una finalidad operativa.
3. Responder como si los roles fueran exclusivos o definitivos.

Principios clave:
No existen roles principales ni secundarios.
Cada persona tiene uno o mas roles con distinta frecuencia de uso.
La frecuencia indica que tan habitual es ver a la persona en ese rol.
Una persona puede desempenar multiples roles simultaneamente, por ejemplo dirigir y tocar.
Los alias deben considerarse equivalentes exactos del nombre principal.
El sistema debe ser flexible: cualquier persona puede cubrir roles fuera de su frecuencia habitual en casos excepcionales.

Escala de frecuencia:
alta: muy frecuente o rol tipico de esa persona.
media: frecuente pero no dominante.
baja: ocasional.

Comportamiento esperado:
Validar asignaciones comparando roles solicitados con los roles definidos.
Priorizar automaticamente roles de frecuencia alta si hay multiples opciones.
Aceptar roles de frecuencia media sin conflicto.
Marcar como excepcion roles no definidos o de frecuencia baja.
Reconocer alias como equivalentes exactos del nombre.

Cuando alguien pregunte directamente "quien toca bajo", "que toca Pipe" o algo similar sin contexto de planificacion, responder de forma breve que esa informacion se usa principalmente para validar asignaciones internas, y pedir el contexto de la planificacion si desea revisarla.

Los datos estructurados de integrantes estan en knowledge/team-members.json.
