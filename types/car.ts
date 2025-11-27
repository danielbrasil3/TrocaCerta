interface MotorInfo {
  motor: string
  oleo: string
  filtros: {
    oleo: string
    combustivel: string
    ar: string
    cabine: string
  }
}

interface CarData {
  [marca: string]: {
    [modelo: string]: {
      [ano: string]: MotorInfo[]
    }
  }
}

export type { CarData, MotorInfo }