import { FormatDatePipe } from "./format-date.pipe";

describe("FormatDatePipe", () => {
  let pipe: FormatDatePipe;

  beforeEach(() => {
    pipe = new FormatDatePipe();
  });

  // Comprobación de que se crea el pipe correctamente
  it("should create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  /*
  REFERENCIA
  if (type === 1) {
      newFormat = ddFormat + mmFormat + yyyy;
    }
    if (type === 2) {
      newFormat = ddFormat + ' / ' + mmFormat + ' / ' + yyyy;
    }
    if (type === 3) {
      newFormat = ddFormat + '/' + mmFormat + '/' + yyyy;
    }
    if (type === 4) {
      newFormat = yyyy + '-' + mmFormat + '-' + ddFormat;
    }

  */

  // Formato de fecha de tipo 1
  it("Formato 1 correcto ddFormat + mmFormat + yyyy", () => {
    const date = new Date(2024, 4, 26); // Mayo es el mes 4, javascript empieza a contar desde 0
    const formattedDate = pipe.transform(date, 1);
    expect(formattedDate).toBe("26052024"); // Hoy
  });

  it("ormato 2 correcto ddFormat + ' / ' + mmFormat + ' / ' + yyyy", () => {
    const date = new Date(2024, 4, 26);
    const formattedDate = pipe.transform(date, 2);
    expect(formattedDate).toBe("26 / 05 / 2024");
  });

  it("ormato 3 correcto ddFormat + '/' + mmFormat + '/' + yyyy", () => {
    const date = new Date(2024, 4, 26);
    const formattedDate = pipe.transform(date, 3);
    expect(formattedDate).toBe("26/05/2024");
  });

  it("ormato 4 correcto yyyy + '-' + mmFormat + '-' + ddFormat", () => {
    const date = new Date(2024, 4, 26); // May 9, 2023
    const formattedDate = pipe.transform(date, 4);
    expect(formattedDate).toBe("2024-05-26");
  });
});
