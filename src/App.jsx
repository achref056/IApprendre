import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, BookOpen, Brain, Sparkles, Users, Target, Award, User, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Toaster } from '@/components/ui/toaster';
import ToolCard from '@/components/ToolCard';
import ChatBot from '@/components/ChatBot';
import { aiTools, audienceCategories, skillCategories } from '@/data/tools';

function App() {
  const [selectedAudience, setSelectedAudience] = useState('Tous');
  const [selectedSkill, setSelectedSkill] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTools, setFilteredTools] = useState(aiTools);

  useEffect(() => {
    let filtered = aiTools;

    if (selectedAudience !== 'Tous') {
      filtered = filtered.filter(tool => tool.targetAudience === selectedAudience);
    }

    if (selectedSkill !== 'Tous') {
      filtered = filtered.filter(tool => tool.category === selectedSkill);
    }

    if (searchTerm) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredTools(filtered);
  }, [selectedAudience, selectedSkill, searchTerm]);

  const stats = [
    { icon: BookOpen, label: "Outils disponibles", value: aiTools.length, color: "from-blue-500 to-cyan-500" },
    { icon: Users, label: "Compétences", value: skillCategories.length -1 , color: "from-purple-500 to-pink-500" },
    { icon: Target, label: "Niveaux couverts", value: "Tous", color: "from-green-500 to-emerald-500" },
    { icon: Award, label: "Qualité", value: "Premium", color: "from-orange-500 to-red-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <Brain className="h-8 w-8" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                IApprendre
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              L'intelligence artificielle au service de l'apprentissage du français
            </p>
            <div className="flex items-center justify-center gap-2 text-blue-200">
              <Sparkles className="h-5 w-5" />
              <span className="text-lg">Découvrez nos outils IA pour une expérience d'apprentissage innovante</span>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </header>

      <section className="container mx-auto px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center text-white`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-0"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Rechercher un outil (ex: prononciation, images...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-purple-500 rounded-xl"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600 font-medium">Filtrer par public :</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {audienceCategories.map((category) => (
                  <Button
                    key={category.name}
                    variant={selectedAudience === category.name ? "default" : "outline"}
                    onClick={() => setSelectedAudience(category.name)}
                    className={`rounded-full transition-all duration-300 ${
                      selectedAudience === category.name
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600 font-medium">Filtrer par compétence :</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {skillCategories.map((category) => (
                  <Button
                    key={category.name}
                    variant={selectedSkill === category.name ? "default" : "outline"}
                    onClick={() => setSelectedSkill(category.name)}
                    className={`rounded-full transition-all duration-300 ${
                      selectedSkill === category.name
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {selectedAudience === 'Tous' && selectedSkill === 'Tous' ? 'Tous les outils' : 
             `Outils pour ${selectedAudience !== 'Tous' ? selectedAudience : 'Tous'} - ${selectedSkill !== 'Tous' ? selectedSkill : 'Toutes compétences'}`}
          </h2>
          <p className="text-gray-600">
            {filteredTools.length} outil{filteredTools.length > 1 ? 's' : ''} trouvé{filteredTools.length > 1 ? 's' : ''}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredTools.length > 0 ? (
            <motion.div
              key="tools-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredTools.map((tool, index) => (
                <ToolCard key={tool.id} tool={tool} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                <Search className="h-12 w-12 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Aucun outil trouvé</h3>
              <p className="text-gray-600 mb-6">
                Essayez de modifier vos critères de recherche ou explorez une autre catégorie.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedAudience('Tous');
                  setSelectedSkill('Tous');
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Réinitialiser les filtres
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-6 w-6" />
                <span className="text-xl font-bold">IApprendre</span>
              </div>
              <p className="text-gray-300">
                Votre guide complet pour intégrer l'intelligence artificielle dans l'apprentissage du français.
              </p>
            </div>
            <div>
              <span className="text-lg font-semibold mb-4 block">Catégories populaires</span>
              <div className="space-y-2">
                {skillCategories.filter(cat => cat.name !== 'Tous').slice(0, 4).map((category) => (
                  <div key={category.name} className="text-gray-300 hover:text-white cursor-pointer transition-colors">
                    {category.icon} {category.name}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="text-lg font-semibold mb-4 block">À propos</span>
              <p className="text-gray-300">
                Cette plateforme rassemble les meilleurs outils d'IA pour enrichir l'apprentissage du français et accompagner les apprenants et enseignants dans leur progression.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} IApprendre. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      <ChatBot />
      <Toaster />
    </div>
  );
}

export default App;