import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ArrowRight, Calendar, Clock, Trophy } from 'lucide-react';
import { MOCK_NEWS, MOCK_EVENTS } from '../constants';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-brown-900 mb-2">Bem-vinda, Dra. Amanda</h1>
          <p className="text-brown-800/70 text-sm md:text-base">Aqui está o resumo das atividades do seu Squad de Inovação.</p>
        </div>
        <Button variant="primary" className="w-full md:w-auto">
          <span className="mr-2">+</span> Novo Projeto
        </Button>
      </div>

      {/* Top Section: News & Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* News Feed - Takes 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-brown-900 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
              Notícias Quentes
            </h2>
            <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">Ver todas</Button>
          </div>
          
          <div className="grid gap-4">
            {MOCK_NEWS.map(news => (
              <Card key={news.id} className="hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <Badge variant="orange">{news.category}</Badge>
                    <h3 className="text-lg md:text-xl font-serif font-semibold text-brown-900 group-hover:text-orange-600 transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-brown-800/70 line-clamp-2 text-sm">{news.summary}</p>
                    <p className="text-xs text-brown-800/40 mt-2">{news.date}</p>
                  </div>
                  <div className="hidden sm:block p-2 bg-cream-100 rounded-full text-brown-800/30 group-hover:bg-orange-100 group-hover:text-orange-500 transition-colors">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Events Sidebar */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-brown-900 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-brown-900 rounded-full"></span>
            Agenda
          </h2>
          <Card className="bg-gradient-to-br from-brown-900 to-brown-800 text-white border-none">
            <div className="space-y-6">
              {MOCK_EVENTS.map((event, idx) => (
                <div key={event.id} className={`flex gap-4 ${idx !== MOCK_EVENTS.length - 1 ? 'border-b border-white/10 pb-4' : ''}`}>
                  <div className="flex flex-col items-center justify-center bg-white/10 rounded-lg p-2 min-w-[3.5rem] backdrop-blur-sm text-center">
                    <span className="text-xs uppercase font-bold opacity-70">{event.date.split(' ')[1]}</span>
                    <span className="text-xl font-bold leading-none">{event.date.split(' ')[0]}</span>
                    <span className="text-[10px] mt-1 opacity-90 font-medium border-t border-white/20 pt-0.5 w-full">{event.time}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-cream-50 leading-tight mb-1">{event.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-cream-200/70">
                      <Clock size={12} />
                      {event.time}
                    </div>
                  </div>
                </div>
              ))}
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white border-none">
                Ver calendário completo
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Section: My Squad Summary */}
      <div className="pt-6 border-t border-cream-300">
        <h2 className="text-lg font-semibold text-brown-900 mb-6 flex items-center gap-2">
          <UsersIcon />
          Resumo do Squad
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <MetricCard 
            label="Projetos Ativos" 
            value="3" 
            trend="+1 este mês" 
            color="orange"
          />
          <MetricCard 
            label="Tarefas Pendentes" 
            value="12" 
            trend="4 alta prio" 
            color="brown"
          />
          <MetricCard 
            label="Conclusão" 
            value="85%" 
            trend="Trilha Tech" 
            color="green"
          />
          <MetricCard 
            label="Mentoria" 
            value="2h" 
            trend="Disponível" 
            color="brown"
            icon={<Trophy size={20} className="text-orange-500" />}
          />
        </div>
      </div>
    </div>
  );
};

// Helper Components for Dashboard
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

const MetricCard = ({ label, value, trend, color, icon }: any) => {
  const isOrange = color === 'orange';
  return (
    <div className={`p-3 md:p-4 rounded-xl border ${isOrange ? 'bg-orange-50 border-orange-100' : 'bg-white border-cream-300'} flex flex-col justify-between h-28 md:h-32 relative overflow-hidden`}>
      <div className="flex justify-between items-start z-10">
        <span className={`text-xs md:text-sm font-medium ${isOrange ? 'text-orange-800' : 'text-brown-800/60'} truncate pr-1`}>{label}</span>
        {icon}
      </div>
      <div className="z-10">
        <span className={`text-2xl md:text-3xl font-bold font-serif ${isOrange ? 'text-orange-600' : 'text-brown-900'}`}>{value}</span>
        <p className={`text-[10px] md:text-xs mt-1 ${isOrange ? 'text-orange-800/70' : 'text-brown-800/50'} truncate`}>{trend}</p>
      </div>
      {/* Decorative background circle */}
      <div className={`absolute -bottom-4 -right-4 w-20 h-20 md:w-24 md:h-24 rounded-full opacity-10 ${isOrange ? 'bg-orange-500' : 'bg-brown-500'}`}></div>
    </div>
  );
};