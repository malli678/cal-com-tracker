
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useStore } from '../store';

const CalendarView = () => {
  const { communications, companies, communicationMethods } = useStore();

  const events = communications.map((comm) => {
    const company = companies.find((c) => c.id === comm.companyId);
    const method = communicationMethods.find((m) => m.id === comm.methodId);

    return {
      id: comm.id,
      title: `${company?.name} - ${method?.name}`,
      date: comm.date,
      extendedProps: {
        notes: comm.notes,
      },
    };
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={(eventInfo) => (
          <div className="p-1">
            <div className="text-xs font-semibold">{eventInfo.event.title}</div>
            {eventInfo.event.extendedProps.notes && (
              <div className="text-xs text-gray-600 truncate">
                {eventInfo.event.extendedProps.notes}
              </div>
            )}
          </div>
        )}
        height="auto"
      />
    </div>
  );
};

export default CalendarView;