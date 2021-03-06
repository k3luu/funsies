import React, { Component } from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import styled from 'styled-components';
import { Link } from 'react-scroll';

import Modal from '../Modal/Modal';
import './Calendar.css';

BigCalendar.momentLocalizer(moment);

const GOOGLE_API_KEY = 'AIzaSyAy-Hn-2rmG7nmc2etp_hNdbLe_xFkpygw';
const CALENDAR_ID = 'two.fivehitches@gmail.com';
const allViews = {
  month: true,
  agenda: true
};

const ModalContent = styled.div`
  width: 500px;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
`;

class Calendar extends Component {
  constructor(p) {
    super(p);

    this.state = {
      events: [],
      isLoading: true,
      showEventModal: false,
      currEvent: null
    };

    this.handleToggleModal = this.handleToggleModal.bind(this);
  }

  componentDidMount() {
    this.getEvents();
  }

  /**
   * function from user @sivafass, package: react-meeting-room
   */
  getEvents() {
    const that = this;
    function start() {
      gapi.client
        .init({
          apiKey: GOOGLE_API_KEY
        })
        .then(() =>
          gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?orderBy=updated`
          })
        )
        .then(response => {
          const sortedEvents = response.result.items.sort((a, b) => {
            return (
              moment(b.start.dateTime).format('YYYYMMDD') -
              moment(a.start.dateTime).format('YYYYMMDD')
            );
          });

          let newEvents = [];

          if (sortedEvents.length > 0) {
            sortedEvents.map(e => {
              newEvents.push({
                id: e.id,
                allDay: !!e.start.date,
                title: e.summary,
                start: e.start.dateTime
                  ? new Date(e.start.dateTime)
                  : new Date(e.start.date).setDate(
                      new Date(e.start.date).getDate() + 1
                    ),
                end: e.end.dateTime
                  ? new Date(e.end.dateTime)
                  : new Date(e.end.date),
                desc: e.description
              });
            });

            that.setState({
              events: newEvents,
              isLoading: false
            });
          } else {
            that.setState({ isLoading: false });
          }
        });
    }
    gapi.load('client', start);
  }

  isValidDate(dateString) {
    let regEx = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.test(regEx) != null;
  }

  handleToggleModal() {
    this.setState({ showEventModal: !this.state.showEventModal });
  }

  handleEventDescription(event) {
    const multipleDaysFlag =
      moment(event.start).format('MMMM Do YYYY') !==
      moment(event.end).format('MMMM Do YYYY');

    let dateFormat;

    if (event.allDay || multipleDaysFlag)
      dateFormat =
        moment(event.start).format('dddd, MMMM Do') +
        ' - ' +
        moment(event.end).format('dddd, MMMM Do');
    else dateFormat = moment(event.start).format('dddd, MMMM Do');

    return (
      <ModalContent>
        <div className="event-date__linebreak" />

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ padding: '0 20px' }}>
            <i className="fa fa-calendar" />
          </div>
          <div className="event-date__start">
            <div>{moment(event.start).format('ddd, MMM DD')}</div>
            <div>{moment(event.start).format('h:mm a')}</div>
          </div>
          <div className="event-date__separator" />
          <div className="event-date__end">
            <div>{moment(event.end).format('ddd, MMM DD')}</div>
            <div>{moment(event.end).format('h:mm a')}</div>
          </div>
        </div>

        <div className="event-date__linebreak" />

        {event.desc && <div className="event-description">{event.desc}</div>}
      </ModalContent>
    );
  }

  handleEventModal() {
    const { showEventModal, currEvent } = this.state;

    if (showEventModal)
      return (
        <Modal
          open={showEventModal}
          onClose={this.handleToggleModal}
          closeContainer={Link}
        >
          <DialogTitle>{currEvent.title}</DialogTitle>
          <DialogContent>
            {this.handleEventDescription(currEvent)}
          </DialogContent>

          <ModalButtonContainer>
            <Link to="calendar-container" spy smooth duration={0}>
              <button type="button" onClick={this.handleToggleModal}>
                Ok
              </button>
            </Link>
          </ModalButtonContainer>
        </Modal>
      );

    return null;
  }

  render() {
    const { events, isLoading } = this.state;

    if (isLoading)
      return (
        <div className="spinner__container">
          <div className="quiver">
            <span className="arrows st" />
            <span className="arrows nd" />
            <span className="arrows rd" />
            <span className="arrows th" />
            <span className="arrows fth" />
            <span className="loading">Loading</span>
          </div>
        </div>
      );

    let model = [
      {
        id: 0,
        title: 'All Day Event very long title',
        allDay: true,
        start: new Date(2015, 3, 0),
        end: new Date(2015, 3, 1)
      },
      {
        id: 1,
        title: 'Long Event',
        start: new Date(2015, 3, 7),
        end: new Date(2015, 3, 10)
      },

      {
        id: 2,
        title: 'DTS STARTS',
        start: new Date(2016, 2, 13, 0, 0, 0),
        end: new Date(2016, 2, 20, 0, 0, 0)
      },

      {
        id: 3,
        title: 'DTS ENDS',
        start: new Date(2016, 10, 6, 0, 0, 0),
        end: new Date(2016, 10, 13, 0, 0, 0)
      },

      {
        id: 4,
        title: 'Some Event',
        start: new Date(2015, 3, 9, 0, 0, 0),
        end: new Date(2015, 3, 10, 0, 0, 0)
      },
      {
        id: 5,
        title: 'Conference',
        start: new Date(2015, 3, 11),
        end: new Date(2015, 3, 13),
        desc: 'Big conference for important people'
      },
      {
        id: 6,
        title: 'Meeting',
        start: new Date(2015, 3, 12, 10, 30, 0, 0),
        end: new Date(2015, 3, 12, 12, 30, 0, 0),
        desc: 'Pre-meeting meeting, to prepare for the meeting'
      },
      {
        id: 7,
        title: 'Lunch',
        start: new Date(2015, 3, 12, 12, 0, 0, 0),
        end: new Date(2015, 3, 12, 13, 0, 0, 0),
        desc: 'Power lunch'
      },
      {
        id: 8,
        title: 'Meeting',
        start: new Date(2015, 3, 12, 14, 0, 0, 0),
        end: new Date(2015, 3, 12, 15, 0, 0, 0)
      },
      {
        id: 9,
        title: 'Happy Hour',
        start: new Date(2015, 3, 12, 17, 0, 0, 0),
        end: new Date(2015, 3, 12, 17, 30, 0, 0),
        desc: 'Most important meal of the day'
      },
      {
        id: 10,
        title: 'Dinner',
        start: new Date(2015, 3, 12, 20, 0, 0, 0),
        end: new Date(2015, 3, 12, 21, 0, 0, 0)
      },
      {
        id: 11,
        title: 'Birthday Party',
        start: new Date(2015, 3, 13, 7, 0, 0),
        end: new Date(2015, 3, 13, 10, 30, 0)
      },
      {
        id: 12,
        title: 'Late Night Event',
        start: new Date(2015, 3, 17, 19, 30, 0),
        end: new Date(2015, 3, 18, 2, 0, 0)
      },
      {
        id: 12.5,
        title: 'Late Same Night Event',
        start: new Date(2015, 3, 17, 19, 30, 0),
        end: new Date(2015, 3, 17, 23, 30, 0)
      },
      {
        id: 13,
        title: 'Multi-day Event',
        start: new Date(2015, 3, 20, 19, 30, 0),
        end: new Date(2015, 3, 22, 2, 0, 0)
      },
      {
        id: 14,
        title: 'Today',
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3))
      }
    ];

    // console.log('events', events, model);

    return (
      <div id="calendar-container">
        <BigCalendar
          events={events}
          // events={model}
          views={allViews}
          step={60}
          showMultiDayTimes
          defaultDate={new Date()}
          onSelectEvent={(event, e) => {
            e.preventDefault();
            this.setState({ currEvent: event, showEventModal: true });
          }}
        />

        {this.handleEventModal()}
      </div>
    );
  }
}

export default Calendar;
