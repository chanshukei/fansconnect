export interface Event {
  eventId: number;
  eventType: string;
  eventName: string;
  eventDescription: string;
  eventDate: Date;
  eventTime: string;
  videoNames: string;
  videoUrls: string;
  videoNamesList: string[];
  videoUrlsList: string[];
}
