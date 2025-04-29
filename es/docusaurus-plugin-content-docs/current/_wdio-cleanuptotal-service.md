---
id: wdio-cleanuptotal-service
title: Servicio de CleanupTotal
custom_edit_url: https://github.com/tzurp/cleanup-total/edit/master/README.md
---


> wdio-cleanuptotal-service es un paquete de terceros, para más información por favor consulta [GitHub](https://github.com/tzurp/cleanup-total) | [npm](https://www.npmjs.com/package/wdio-cleanuptotal-service)

Con el servicio `cleanup-total` para [webdriver.io](https://webdriver.io/), puedes asegurar fácilmente una limpieza adecuada después de cada prueba. El servicio proporciona una forma sistemática de marcar entidades para su eliminación inmediatamente después de su creación. Esto es particularmente útil cuando las pruebas implican la creación de estructuras complejas, como una cuenta bancaria con un plan de inversión y un depósito. Sin una limpieza adecuada, intentar eliminar la cuenta puede resultar en errores, como una negativa debido a que la cuenta no está vacía. Sin embargo, con __cleanup-total__, las entidades se eliminan en el orden correcto, asegurando que las pruebas se limpien después de sí mismas y no interfieran entre sí.

## Instalación
La forma más sencilla de instalar este módulo como una (dev-)dependencia es utilizando el siguiente comando:

```
npm install wdio-cleanuptotal-service --save-dev
```

## Uso

Añade wdio-cleanuptotal-service a tu `wdio.conf.ts`:

```typescript
export const config: WebdriverIO.Config = {
  // ... otras opciones

  services: ['cleanuptotal']

  // ... otras opciones
};
```

o con las opciones del servicio:

```typescript
export const config: WebdriverIO.Config = {
  // ... otras opciones

  services: [
    [
      'cleanuptotal',
      {
        // Usa una función de registro personalizada para escribir mensajes en el informe de prueba
        customLoggerMethod: console.log(), // TODO: reemplaza con tu propia función de registro si es necesario

        // Solo escribe en el registro cuando ocurre un error para reducir el desorden
        logErrorsOnly: false, // TODO: considera cambiar a 'true' si tienes demasiados mensajes en el informe
      }
    ]
  ]

  // ... otras opciones
};
```

## Uso en pruebas

Puedes importar el servicio __cleanuptotal__ donde lo necesites, ya sea en tu archivo de prueba o en cualquier otra clase.

```typescript
import { cleanuptotal } from "wdio-cleanuptotal-service";

it("should keep things tidy", () => {
  // ...

  // Create an account and add it to the cleanup list for deletion after the test
  const accountId = createAccount("John Blow");
  cleanupTotal.addCleanup(async () => {
    await deleteAccount(accountId);
  });

  // Add an investment plan to the account and add it to the cleanup list
  addInvestmentPlan(accountId, "ModRisk");
  cleanupTotal.addCleanup(async () => {
    await removeInvestmentPlan(accountId);
  });

  // Deposit funds into the account and add it to the cleanup list
  deposit(accountId, 1000000);
  cleanupTotal.addCleanup(async () => {
    await undoDeposit(accountId);
  });

  // ...

});

// Note that the actual cleanup code will be executed after the test is complete
```

## Soporte de Typescript

Este plugin tiene soporte para Typescript.

## Soporte

Para soporte y sugerencias, no dudes en contactarme en [tzur.paldi@outlook.com](https://github.com/tzurp/cleanup-total/blob/master/mailto:tzur.paldi@outlook.com).