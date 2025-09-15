import { useState } from 'react';
import { Calendar, Target, Dumbbell, Utensils, TrendingDown, Clock, CheckCircle2, Trophy, Zap } from 'lucide-react';

export default function FitnessDashboard() {
  const [currentWeight] = useState(110);
  const [currentDate] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [checkedMeals, setCheckedMeals] = useState<Record<string, boolean>>({});
  const [checkedWorkouts, setCheckedWorkouts] = useState<Record<string, boolean>>({});

  const startDate = new Date('2025-09-15');
  const endDate = new Date('2025-12-15');
  const daysTotal = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysPassed = Math.ceil((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const progress = Math.max(0, Math.min(100, (daysPassed / daysTotal) * 100));

  const targetWeight = 98;
  const weightLoss = 110 - currentWeight;
  const remainingLoss = currentWeight - targetWeight;

  const workoutPlan = {
    A: {
      name: "Peito, Tríceps, Ombro",
      exercises: [
        "Supino reto - 3x12-15",
        "Supino inclinado - 3x12-15",
        "Crucifixo - 3x15",
        "Desenvolvimento - 3x12",
        "Elevação lateral - 3x15",
        "Tríceps pulley - 3x15",
        "Tríceps francês - 3x12",
      ],
      color: "from-red-500 to-pink-500",
    },
    B: {
      name: "Costas, Bíceps, Abdomen",
      exercises: [
        "Puxada frontal - 3x12-15",
        "Remada baixa - 3x12-15",
        "Remada alta - 3x12",
        "Pullover - 3x15",
        "Rosca direta - 3x12",
        "Rosca martelo - 3x12",
        "Prancha - 3x30-45seg",
        "Abdominal supra - 3x20",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    C: {
      name: "Pernas, Glúteos, Cardio",
      exercises: [
        "Agachamento - 3x12-15",
        "Leg press - 3x15",
        "Extensora - 3x15",
        "Mesa flexora - 3x12",
        "Panturrilha - 3x20",
        "Agachamento sumô - 3x15",
        "Cardio - 10min",
      ],
      color: "from-green-500 to-emerald-500",
    },
  };

  const nutritionPlan = {
    breakfast: {
      time: "7h-8h",
      items: ["2 ovos mexidos + pão integral", "1 fruta", "Café sem açúcar"],
      icon: "🍳",
    },
    morningSnack: {
      time: "10h",
      items: ["Iogurte natural desnatado", "Granola sem açúcar"],
      icon: "🥛",
    },
    lunch: {
      time: "12h-13h",
      items: [
        "120g proteína magra",
        "2 col. arroz integral",
        "Salada + legumes",
        "Azeite",
      ],
      icon: "🥗",
    },
    afternoonSnack: {
      time: "15h-16h",
      items: ["Whey protein", "8-10 castanhas"],
      icon: "💪",
    },
    dinner: {
      time: "Segunda/Quarta: 19h | Demais: 20h",
      items: ["200-250g proteína", "Carboidrato", "Salada completa", "Azeite"],
      icon: "🍽️",
    },
  };

  const toggleMeal = (meal: string) => {
    setCheckedMeals(prev => ({
      ...prev,
      [meal]: !prev[meal]
    }));
  };

  const toggleWorkout = (exercise: string) => {
    setCheckedWorkouts(prev => ({
      ...prev,
      [exercise]: !prev[exercise]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  FitTracker Pro
                </h1>
                <p className="text-sm text-gray-400">
                  Sua jornada de transformação
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Dias restantes</p>
              <p className="text-2xl font-bold text-purple-400">
                {Math.max(0, daysTotal - daysPassed)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex space-x-2 bg-black/20 p-1 rounded-2xl backdrop-blur-sm border border-white/10 w-fit">
          {[
            { id: "dashboard", icon: Target, label: "Dashboard" },
            { id: "workouts", icon: Dumbbell, label: "Treinos" },
            { id: "nutrition", icon: Utensils, label: "Nutrição" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                selectedTab === tab.id
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        {/* Dashboard Tab */}
        {selectedTab === "dashboard" && (
          <div className="space-y-8">
            {/* Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm font-medium">
                      Peso Atual
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {currentWeight}kg
                    </p>
                    <p className="text-sm text-gray-400">Meta: 98kg</p>
                  </div>
                  <Target className="w-12 h-12 text-purple-400" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 text-sm font-medium">
                      Perdidos
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {weightLoss.toFixed(1)}kg
                    </p>
                    <p className="text-sm text-gray-400">
                      Restam: {remainingLoss.toFixed(1)}kg
                    </p>
                  </div>
                  <TrendingDown className="w-12 h-12 text-green-400" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300 text-sm font-medium">
                      Progresso
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {Math.round(progress)}%
                    </p>
                    <p className="text-sm text-gray-400">
                      {daysPassed} de {daysTotal} dias
                    </p>
                  </div>
                  <Trophy className="w-12 h-12 text-blue-400" />
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-purple-400" />
                Progresso do Plano
              </h3>
              <div className="w-full bg-gray-800 rounded-full h-4 mb-4">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-1000 shadow-lg shadow-purple-500/50"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>15 Set 2025</span>
                <span>{Math.round(progress)}% completo</span>
                <span>15 Dez 2025</span>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-purple-400" />
                Agenda de Hoje
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      🍳
                    </div>
                    <div>
                      <p className="font-medium">Café da Manhã</p>
                      <p className="text-sm text-gray-400">7h-8h</p>
                    </div>
                  </div>
                  <Zap className="w-5 h-5 text-orange-400" />
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                      🏋️
                    </div>
                    <div>
                      <p className="font-medium">
                        Treino A - Peito/Tríceps/Ombro
                      </p>
                      <p className="text-sm text-gray-400">18h-18h50</p>
                    </div>
                  </div>
                  <Dumbbell className="w-5 h-5 text-red-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Workouts Tab */}
        {selectedTab === "workouts" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center">
              <Dumbbell className="w-6 h-6 mr-2 text-purple-400" />
              Plano de Treinos
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {Object.entries(workoutPlan).map(([key, workout]) => (
                <div
                  key={key}
                  className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-black/30 transition-all duration-300"
                >
                  <div
                    className={`w-full h-32 bg-gradient-to-r ${workout.color} rounded-xl mb-4 flex items-center justify-center`}
                  >
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        TREINO {key}
                      </h3>
                      <p className="text-white/80 text-sm">{workout.name}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {workout.exercises.map((exercise, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <button
                          onClick={() => toggleWorkout(`${key}-${index}`)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            checkedWorkouts[`${key}-${index}`]
                              ? "bg-green-500 border-green-500"
                              : "border-gray-500 hover:border-green-400"
                          }`}
                        >
                          {checkedWorkouts[`${key}-${index}`] && (
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          )}
                        </button>
                        <span
                          className={`text-sm flex-1 ${
                            checkedWorkouts[`${key}-${index}`]
                              ? "line-through text-gray-500"
                              : "text-gray-300"
                          }`}
                        >
                          {exercise}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nutrition Tab */}
        {selectedTab === "nutrition" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center">
              <Utensils className="w-6 h-6 mr-2 text-purple-400" />
              Plano Nutricional
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(nutritionPlan).map(([key, meal]) => (
                <div
                  key={key}
                  className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-black/30 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center text-2xl">
                      {meal.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </h3>
                      <p className="text-sm text-gray-400">{meal.time}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {meal.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <button
                          onClick={() => toggleMeal(`${key}-${index}`)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            checkedMeals[`${key}-${index}`]
                              ? "bg-green-500 border-green-500"
                              : "border-gray-500 hover:border-green-400"
                          }`}
                        >
                          {checkedMeals[`${key}-${index}`] && (
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          )}
                        </button>
                        <span
                          className={`text-sm flex-1 ${
                            checkedMeals[`${key}-${index}`]
                              ? "line-through text-gray-500"
                              : "text-gray-300"
                          }`}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Hydration & Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hydration Reminder */}
              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center text-blue-300">
                  💧 Hidratação Diária
                </h3>
                <p className="text-gray-300 mb-2">
                  Meta:{" "}
                  <span className="font-bold text-blue-300">
                    3 litros de água
                  </span>
                </p>
                <div className="flex space-x-2 mb-3">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-8 bg-blue-900/30 border border-blue-500/30 rounded-sm hover:bg-blue-500/20 cursor-pointer transition-colors"
                    ></div>
                  ))}
                </div>
                <p className="text-xs text-gray-400">
                  Cada copo = 250ml | Clique para marcar
                </p>
                <div className="mt-4 space-y-1 text-sm text-blue-200">
                  <p>• Água com limão em jejum</p>
                  <p>• Chás sem açúcar liberados</p>
                  <p>• 500ml antes de cada refeição</p>
                </div>
              </div>

              {/* Important Tips */}
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center text-amber-300">
                  💡 Dicas Importantes
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">
                      Mastigue devagar, principalmente no jantar
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">
                      Pare de comer 2h antes de dormir
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">
                      Evite: refrigerantes, doces, frituras, álcool
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">
                      Prefira: integrais, proteínas magras, vegetais
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
