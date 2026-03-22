import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from './ui/Button';

interface Event {
  id: string;
  date: Date;
  title: string;
  type: 'meeting' | 'deadline' | 'milestone';
}

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<Event[]>([
    { id: '1', date: new Date(new Date().getFullYear(), new Date().getMonth(), 12), title: 'Daily Squad Alpha', type: 'meeting' },
    { id: '2', date: new Date(new Date().getFullYear(), new Date().getMonth(), 15), title: 'Entrega Sprint 1', type: 'deadline' },
  ]);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  };

  const isSelected = (day: number) => {
    return selectedDate?.getDate() === day && selectedDate?.getMonth() === month && selectedDate?.getFullYear() === year;
  };

  const hasEvent = (day: number) => {
    return events.some(e => 
      e.date.getDate() === day && 
      e.date.getMonth() === month && 
      e.date.getFullYear() === year
    );
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(e => 
      e.date.getDate() === date.getDate() && 
      e.date.getMonth() === date.getMonth() && 
      e.date.getFullYear() === date.getFullYear()
    );
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(year, month, day));
  };

  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventType, setNewEventType] = useState<'meeting' | 'deadline' | 'milestone'>('meeting');

  const handleAddEvent = () => {
    if (!newEventTitle.trim() || !selectedDate) return;
    
    const newEvent: Event = {
      id: Date.now().toString(),
      date: selectedDate,
      title: newEventTitle,
      type: newEventType,
    };

    setEvents(prev => [...prev, newEvent]);
    setNewEventTitle('');
    setShowAddEvent(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-brown-900 font-serif">{monthNames[month]} {year}</h3>
        <div className="flex gap-1">
          <button onClick={prevMonth} className="p-1 hover:bg-cream-100 rounded-full text-brown-800/60 transition-colors">
            <ChevronLeft size={18} />
          </button>
          <button onClick={nextMonth} className="p-1 hover:bg-cream-100 rounded-full text-brown-800/60 transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-[10px] font-bold text-brown-800/40 mb-2 uppercase tracking-wider">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => <span key={d}>{d}</span>)}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {[...Array(firstDayOfMonth(year, month))].map((_, i) => (
          <div key={`empty-${i}`} className="h-8 md:h-10" />
        ))}
        {[...Array(daysInMonth(year, month))].map((_, i) => {
          const day = i + 1;
          const today = isToday(day);
          const selected = isSelected(day);
          const event = hasEvent(day);

          return (
            <button
              key={day}
              onClick={() => {
                handleDateClick(day);
                setShowAddEvent(false);
              }}
              className={`
                h-8 md:h-10 flex flex-col items-center justify-center rounded-lg relative transition-all
                ${selected ? 'bg-brown-900 text-white shadow-md scale-105 z-10' : 'hover:bg-cream-100 text-brown-800'}
                ${today && !selected ? 'border border-orange-500 text-orange-600 font-bold' : ''}
              `}
            >
              <span className="text-xs md:text-sm">{day}</span>
              {event && (
                <span className={`w-1 h-1 rounded-full absolute bottom-1.5 ${selected ? 'bg-orange-400' : 'bg-orange-500'}`} />
              )}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className="mt-6 pt-4 border-t border-cream-200 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-brown-800/60 uppercase tracking-widest">
              Eventos: {selectedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
            </h4>
            <button 
              onClick={() => setShowAddEvent(!showAddEvent)}
              className={`transition-colors ${showAddEvent ? 'text-brown-400' : 'text-orange-600 hover:text-orange-700'}`}
            >
              <Plus size={14} className={showAddEvent ? 'rotate-45 transition-transform' : 'transition-transform'} />
            </button>
          </div>

          {showAddEvent ? (
            <div className="bg-cream-50 p-3 rounded-xl border border-orange-100 space-y-3 animate-in zoom-in-95 duration-200">
              <input 
                autoFocus
                type="text" 
                placeholder="Título do evento..."
                className="w-full bg-white border border-cream-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddEvent()}
              />
              <div className="flex gap-2">
                {(['meeting', 'deadline', 'milestone'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setNewEventType(type)}
                    className={`flex-1 py-1 rounded-md text-[10px] font-bold uppercase transition-all border
                      ${newEventType === type 
                        ? 'bg-brown-900 text-white border-brown-900' 
                        : 'bg-white text-brown-800/40 border-cream-200 hover:border-brown-200'}
                    `}
                  >
                    {type === 'meeting' ? 'Reunião' : type === 'deadline' ? 'Prazo' : 'Marco'}
                  </button>
                ))}
              </div>
              <Button size="sm" className="w-full py-1.5 text-xs" onClick={handleAddEvent}>
                Agendar
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {getEventsForDate(selectedDate).length > 0 ? (
                getEventsForDate(selectedDate).map(e => (
                  <div key={e.id} className="flex items-center gap-3 p-2 bg-cream-50 rounded-lg border border-cream-200/50 group hover:border-orange-200 transition-colors">
                    <div className={`w-1 h-8 rounded-full ${
                      e.type === 'meeting' ? 'bg-blue-400' : 
                      e.type === 'deadline' ? 'bg-red-400' : 'bg-orange-400'
                    }`} />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-brown-900">{e.title}</p>
                      <p className="text-[10px] text-brown-800/50 capitalize">{e.type}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[10px] text-brown-800/30 italic text-center py-4">Nenhum compromisso agendado.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
