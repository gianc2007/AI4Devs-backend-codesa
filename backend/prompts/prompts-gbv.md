### Usando cursor

### Prompt solicitud
Como ingeniero de desarrollo experto en backed con typescript, aplicando las buenas practicas de desarrollo DDD, SOLID, DRY, se requiere desarrollar los siguientes endpoint:

Rq1: Crear un edpoint recogerá todos los candidatos en proceso para una determinada posición.
- El endpoint debe crearse como get
- El endpoint debe ser /positions/:id/candidates
- El parametro id se pasa por URL
- Debe retonar una lista de candidate con @Interview.ts  para una determinada positionId
- Debes retonar el nombre completo del cantidato de @Candidate.ts, el nombre completo es la union de firtsName y lastName
- current_interview_step: en qué fase del proceso está el candidato de @Application.ts 
- el score de la interview.

RQ2. 
Crear un endpoint que permita actualizar la etapa del candidato.
- El endpoint debe ser un PUT /candidates/:id/stage
- Modificar currentInterviewStep de la @Application.ts  asociada a la interview del candidato.

Ten en cuenta que soy un Ingeniero de desarrollo experto en backed.
Separemos la solución en cotroller, service y model.
Los controller van en @controllers 

Contexto del proyecto: @backend 

### Respuesta

Para implementar los requisitos solicitados, vamos a crear dos nuevos endpoints en el proyecto. Estos endpoints estarán organizados siguiendo las buenas prácticas de desarrollo, separando la lógica en controladores, servicios y modelos.

### RQ1: Obtener todos los candidatos en proceso para una posición específica

#### 1. Controlador

Vamos a crear un nuevo controlador para manejar la solicitud GET en `/positions/:id/candidates`.

#### 2. Servicio

El servicio se encargará de la lógica de negocio para obtener los candidatos.

#### 3. Modelo

Añadimos un método estático en el modelo `Candidate` para obtener los candidatos por `positionId`.

export class Candidate {
    static async findManyByPositionId(positionId: number): Promise<Candidate[]> {
        return await prisma.candidate.findMany({
            where: {
                applications: {
                    some: {
                        positionId: positionId,
                    },
                },
            },
            include: {
                applications: {
                    include: {
                        interviews: true,
                    },
                },
            },
        });
    }
}

### RQ2: Actualizar la etapa del candidato

#### 1. Controlador

Creamos un controlador para manejar la solicitud PUT en `/candidates/:id/stage`.

#### 2. Servicio

El servicio se encargará de la lógica de negocio para actualizar la etapa del candidato.

#### 3. Modelo

Añadimos un método estático en el modelo `Application` para encontrar la aplicación por `candidateId`.

export class Application {
    static async findOneByCandidateId(candidateId: number): Promise<Application | null> {
        return await prisma.application.findFirst({
            where: { candidateId: candidateId },
        });
    }
}

### Resumen

- **Controladores**: Se encargan de recibir las solicitudes HTTP y delegar la lógica a los servicios.
- **Servicios**: Contienen la lógica de negocio y se comunican con los modelos.
- **Modelos**: Interactúan directamente con la base de datos a través de Prisma.

Con esta estructura, hemos implementado los dos endpoints solicitados, manteniendo el código organizado y siguiendo las buenas prácticas de desarrollo.

