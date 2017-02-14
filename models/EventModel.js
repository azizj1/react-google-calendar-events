import moment from 'moment';
import Remarkable from 'remarkable';

const md = new Remarkable();
const defaultPicture = '/assets/images/defaultEvent-thumbnail.jpg';

//given https://www.youtube.com/watch?v=oyEuk8j8imI, it'll return oyEuk8j8imI
export function getYTubeID(url) {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return false;
  }
}

export default class Event {

  constructor(calendarApiEvent) {
    if (calendarApiEvent == null)
      throw 'item cannot be null';
    if (calendarApiEvent.status == 'cancelled') {
      throw "cancelled events are not currently supported";
    }

    this.id = calendarApiEvent.id;
    this.startTime = new Date(calendarApiEvent.start.dateTime || calendarApiEvent.start.date);
    this.endTime = new Date(calendarApiEvent.end.dateTime || calendarApiEvent.end.date);
    this.isAllDayEvent = calendarApiEvent.start.dateTime == null;

    this.title = calendarApiEvent.summary;
    this.location = calendarApiEvent.location;
    this.eventLink = calendarApiEvent.htmlLink;

    this.imgUrl = null;
    this.ytId = null;
    this.description = null;
    this.defaultPicture = defaultPicture;

    if (calendarApiEvent.attachments != null && calendarApiEvent.attachments.length > 0) {
      this.imgUrl = 'https://drive.google.com/uc?export=view&id=' + calendarApiEvent.attachments[0].fileId;
    }

    if (calendarApiEvent.description != null) {
      this.description = calendarApiEvent.description.split('\n');
      if (this.description.length > 0) {

        this.ytId = getYTubeID(this.description[0]) || null;
        if (this.ytId != null)
          this.description.shift();

        this.shouldHideForStickyOnlyView = (this.description[0] === "hide") || false;
        if (this.shouldHideForStickyOnlyView)
          this.description.shift();
        this.description = this.description.join('\n')
      }
      else
        this.description = calendarApiEvent.description;
    }
  }

  getPrintFields() {
    let startTime       = moment(this.startTime),
        endTime         = moment(this.endTime);

    // when it's an all day event, the date is given in UTC midnight, so we have to use formatting in utc.
    // thus, we just turn a flag on that says to do that
    if (this.isAllDayEvent) {
      startTime.utc();
      endTime.utc();
    }
    let printFields = {
      startDateStr:       startTime.format('ddd, MMM D, YYYY'),     // Tue, Jun 29, 2014
      startMonthStr:      startTime.format('MMM'),                  // Jun
      startDayOfMonth:    startTime.date(),
      startYear:          startTime.year(),
      interval:           null
    };
    let startTimeStr      = startTime.format('h:mma'),                // 8:00pm
        endDateStr        = endTime.format('ddd, MMM D, YYYY'),
        endTimeStr        = endTime.format('h:mma');

    // we have two fields: 1) tells user the date the event is at. 2) a) either what time to what time if same day and not
    // all day, or b) "ALL DAY" if the event is all day, or c) the end date if it's across multiple days

    if (this.isAllDayEvent) {
      if (endTime.diff(startTime, 'days') === 1) // if the difference is only one day apart, say ALL DAY
        printFields.interval = "ALL DAY";
      else
        printFields.interval = endDateStr; // if multiple days apart, just say the end date
    }
    else {
      if (startTime.isSame(endTime, 'day')) // if year, month and day are equal
        printFields.interval = startTimeStr + " to " + endTimeStr; // 4:00pm to 8:00pm
      else { // i.e., they have time but span over multiple days, so just reformat and include the time
        printFields.startDateStr = startTime.format('ddd, MMM D, YYYY h:mma');
        printFields.interval = endTime.format('ddd, MMM D, YYYY h:mma')
      }
    }

    return printFields;
  }

  getRawDescriptionMarkup() {
    var rawMarkup = md.render(this.description);
    return { __html: rawMarkup };
  }
}