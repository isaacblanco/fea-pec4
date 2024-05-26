# PEC 4 - FEA (Front End Avanzado)

Se debe arrancar el API con el puerto 3000
En mi caso (nota interna) esta en: **/Users/isaacblanco/Sites/FEADV/PEC1/blog-uoc-project-api** (nota interna)
Y lanzar: **npm run start:dev**

Recordatorio para mí, usuario programa (local):

User: ibp@mail.com
Pass: demodemo

Repositorio gitHub: https://github.com/isaacblanco/fea-pec4

Antes de empezar a crear los tests se han realizado las operaciones solicitads, borrando todos los ficheros .spec.ts

## Ejercicio 1 - test pipe

Se han creado los 5 tests solicitados en el fichero format-date.pipe.spec.ts

## Ejercicio 2 - test rutas

Se ha modificado header.component.html para que todas las rutas apunten a la función navigationTo.

Se ha modificado header.component.ts, comentando todos los métodos y agregando el nuevo navigationTo

```typescript
  navigationTo(route: string): void {
    this.router.navigateByUrl(route);
  }
```

Se ha recuperado el fichero: header.component.spec.ts, añadiendo los test solicitados
Para simplificar use un array en la peticiones de ruta.

## Ejercicio 3 - test servicios

Se han ajustado los ts para que responda bien a los tests.
Basandome el los DTO he recuperado los fichero spec.ts de ambos servicios (categoría y post) y he generado los test requeridos.

## Ejercicio 4 - test componentes

Se han recuperado los archivos .spec.ts correspondientes.

## Ejercicio 5 - test vista

Se han incluido test dentro del header, dado que es la página que se ocupa de mostrarlos.

![Resultados](results.png)
