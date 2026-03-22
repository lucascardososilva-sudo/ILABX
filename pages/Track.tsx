import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { PlayCircle, FileText, CheckCircle, Lock } from 'lucide-react';
import { MOCK_MODULES_BUSINESS, MOCK_MODULES_TECH } from '../constants';

interface TrackPageProps {
  type: 'business' | 'tech';
}

export const TrackPage: React.FC<TrackPageProps> = ({ type }) => {
  const isBusiness = type === 'business';
  const modules = isBusiness ? MOCK_MODULES_BUSINESS : MOCK_MODULES_TECH;
  const title = isBusiness ? 'Trilha de Negócios & Inovação' : 'Trilha Tech & Direito Digital';
  const subtitle = isBusiness ? 'Domine metodologias ágeis e estratégias de mercado.' : 'Compreenda a lógica por trás da tecnologia jurídica.';
  
  // :BACKEND_INTEGRATION_POINT: Fetch progress from DB

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-8rem)] animate-in fade-in duration-500">
      
      {/* Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="mb-6">
           <Badge variant={isBusiness ? 'green' : 'orange'} className="mb-2">
             {isBusiness ? 'Business Track' : 'Tech Track'}
           </Badge>
           <h1 className="text-3xl font-serif font-bold text-brown-900 mb-2">{title}</h1>
           <p className="text-brown-800/70">{subtitle}</p>
        </div>

        {/* Video Player / Content Placeholder */}
        <div className="flex-1 bg-black rounded-xl overflow-hidden shadow-lg relative group min-h-[300px]">
          <img 
            src={`https://picsum.photos/1200/800?grayscale&blur=2`} 
            alt="Video content" 
            className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-20 h-20 bg-orange-500/90 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform hover:bg-orange-600">
              <PlayCircle size={40} fill="currentColor" />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
             <h2 className="text-white font-serif text-2xl font-bold">Aula 1: Introdução ao Ecossistema</h2>
             <p className="text-white/80 mt-1">Prof. Dr. Ricardo Silva • Duração: 15min</p>
          </div>
        </div>

        {/* Resources / Description */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
           <Card className="p-4">
             <h3 className="font-semibold text-brown-900 mb-2">Materiais Complementares</h3>
             <ul className="space-y-2 text-sm text-brown-800/80">
               <li className="flex items-center gap-2 hover:text-orange-600 cursor-pointer"><FileText size={16}/> Slides da Aula (PDF)</li>
               <li className="flex items-center gap-2 hover:text-orange-600 cursor-pointer"><FileText size={16}/> Template Business Canvas</li>
             </ul>
           </Card>
           <Card className="p-4">
             <h3 className="font-semibold text-brown-900 mb-2">Anotações do Squad</h3>
             <textarea className="w-full h-24 p-2 bg-cream-50 border border-cream-200 rounded-md text-sm focus:ring-1 focus:ring-orange-500/50 resize-none outline-none" placeholder="Faça suas anotações aqui..."></textarea>
           </Card>
        </div>
      </div>

      {/* Sidebar Modules */}
      <Card className="w-full lg:w-80 p-0 flex flex-col h-full border-l border-cream-300 bg-white/50">
        <div className="p-5 border-b border-cream-200">
          <h3 className="font-bold text-brown-900">Conteúdo do Curso</h3>
          <div className="mt-2 h-2 w-full bg-cream-200 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 w-1/3"></div>
          </div>
          <p className="text-xs text-brown-800/50 mt-1">33% Concluído</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {modules.map((module, index) => (
            <div 
              key={module.id} 
              className={`p-4 border-b border-cream-100 transition-colors flex gap-3
                ${index === 1 ? 'bg-orange-50/50 border-l-4 border-l-orange-500' : 'hover:bg-cream-50'}
                ${!module.completed && index > 1 ? 'opacity-60' : ''}
              `}
            >
              <div className="mt-1">
                {module.completed ? (
                  <CheckCircle size={18} className="text-green-600" />
                ) : index > 1 ? (
                  <Lock size={18} className="text-brown-800/30" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-orange-500"></div>
                )}
              </div>
              <div>
                <p className={`text-sm font-medium ${index === 1 ? 'text-orange-700' : 'text-brown-900'}`}>{module.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-brown-800/50 flex items-center gap-1">
                     {module.type === 'video' ? <PlayCircle size={10} /> : <FileText size={10} />}
                     {module.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-cream-200">
           <Button className="w-full" variant="outline">Certificado (Bloqueado)</Button>
        </div>
      </Card>

    </div>
  );
};