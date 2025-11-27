import { useEffect, useState } from "react";
import { CarData, MotorInfo } from "./../types/car";

export function useCarSelector() {
  const [carData, setCarData] = useState<CarData>({});
  const [carName, setCarName] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMotor, setSelectedMotor] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // =========================
  //  LOAD DATA FROM API
  // =========================
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/api/cars");
        
        if (!response.ok) {
          throw new Error(`Erro na API: ${response.statusText}`);
        }
        
        const data: CarData = await response.json();
        setCarData(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erro desconhecido ao carregar dados";
        setError(errorMessage);
        console.error("Erro ao carregar dados:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarData();
  }, []);

  // =========================
  // AUTO-SELEÇÃO DE MOTOR
  // =========================
  useEffect(() => {
    if (selectedYear && !selectedMotor) {
      const motors = getMotorsForYear(selectedYear);
      if (motors.length === 1) {
        setSelectedMotor(motors[0]);
      }
    }
  }, [selectedYear]);

  // =========================
  // HANDLES
  // =========================
  const handleSearch = (value: string) => {
    setCarName(value);
    resetSelections();

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    const searchTerm = value.toUpperCase();
    const results = Object.keys(carData).filter((carKey) =>
      carKey.toUpperCase().includes(searchTerm)
    );

    setSearchResults(results);
  };

  const handleSelectCar = (car: string) => {
    setCarName(car);
    resetSelections();
    setSearchResults([]);
  };

  const handleSelectModel = (model: string) => {
    setSelectedModel(model);
    setSelectedYear(null);
    setSelectedMotor(null);
  };

  const handleSelectYear = (year: number) => {
    setSelectedYear(year);
    setSelectedMotor(null);
  };

  const handleSelectMotor = (motor: string) => {
    setSelectedMotor(motor);
  };

  const handleReset = () => {
    setCarName("");
    resetSelections();
    setSearchResults([]);
  };

  const resetSelections = () => {
    setSelectedModel("");
    setSelectedYear(null);
    setSelectedMotor(null);
  };

  // =========================
  // DERIVED DATA
  // =========================

  const models = Object.keys(carData[carName] || {});
  const hasModels = models.length > 0;

  const selectedModelData = carData[carName]?.[selectedModel] || {};

  const years = Object.keys(selectedModelData)
    .map(Number)
    .sort((a, b) => b - a);

  const getMotorsForYear = (year: number) => {
    return (selectedModelData[year] || []).map(
      (info: MotorInfo) => info.motor
    );
  };

  const getMotorDetails = (year: number, motor: string) => {
    return (selectedModelData[year] || []).find(
      (info: MotorInfo) => info.motor === motor
    );
  };

  const availableMotors = selectedYear ? getMotorsForYear(selectedYear) : [];

  const motorDetails =
    selectedYear && selectedMotor
      ? getMotorDetails(selectedYear, selectedMotor)
      : null;

  // =========================
  // STEP SYSTEM
  // =========================
  const getCurrentStep = () => {
    if (!hasModels) return 0;
    if (!selectedModel) return 1;
    if (!selectedYear) return 2;
    if (availableMotors.length > 1 && !selectedMotor) return 3;
    return 4;
  };

  const currentStep = getCurrentStep();

  return {
    // state
    carName,
    selectedModel,
    selectedYear,
    selectedMotor,
    searchResults,
    models,
    years,
    availableMotors,
    motorDetails,
    currentStep,
    hasModels,
    isLoading,
    error,

    // handlers
    handleSearch,
    handleSelectCar,
    handleSelectModel,
    handleSelectYear,
    handleSelectMotor,
    handleReset,

    // setters (para casos onde precisamos resetar específico)
    setSelectedModel,
    setSelectedYear,
    setSelectedMotor,
  };
}
