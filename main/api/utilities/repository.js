//Initialize Prisma Client//
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//------------------------------------------------------------------------------------------------------------//




//CONFERENCE CRUD ---- DONE
//adding a conference but not sorting the dates
export async function createConferenceDate(conferenceDate) {
  const createdConferenceDate = await prisma.ConferenceDates.create({
    data: {
      date: conferenceDate.date,
      created: new Date(),
    },
  });
  return createdConferenceDate;
}

//returning a sorted list of conference dates
export async function readConferenceDates() {
    const conferenceDates = await prisma.ConferenceDates.findMany({
      orderBy: {
        date: 'asc',
      },
    });
    return conferenceDates;
}

//delete a conference date based on id
export async function deleteConferenceDate(id) {
    const deletedConferenceDate = await prisma.ConferenceDates.delete({
      where: {
        id: id,
      },
    });
  
    return deletedConferenceDate;
}
//------------------------------------------------------------------------------------------------------------//




//INSTITUTIONS CRUD ---- DONE
//creates an institution by being passed an institution object
export async function createInstitute(institution) {
    const createdInstitution = await prisma.Institution.create({
      data: {
        ...institution,
        created: new Date(),
      },
    });
  
    return createdInstitution;
}

//returns all institutions
export async function readInstitutions() {
    const institutions = await prisma.Institution.findMany();
    return institutions;
}
//------------------------------------------------------------------------------------------------------------//




//LOCATION CRUD ---- DONE
//creates new location
export async function createLocation(location) {
    const createdLocation = await prisma.Location.create({
      data: {
        ...location,
        created: new Date(),
      },
    });
  
    return createdLocation;
}

//returns all locations
export async function readLocations() {
    const locations = await prisma.Location.findMany();
    return locations;
}
//------------------------------------------------------------------------------------------------------------//




//PAPER CRUD ---- DONE
//creates a paper
export async function createPaper(paper) {
    const createdPaper = await prisma.Paper.create({
      data: {
        ...paper,
        created: new Date(),
      },
    });
  
    return createdPaper;
}

//returns all papers
export async function readPapers() {
    const papers = await prisma.Paper.findMany({
      include: {
        authors: true,
        reviewers: true,
      },
    });
    return papers;
}

//returns a paper based on the id
export async function readPaper(id) {
    const paper = await prisma.Paper.findUnique({
      where: {
        id: id,
      },
      include: {
        authors: true,
        reviewers: true,
      },
    });
  
    return paper;
}

///updates a paper based on the id -- no need for validation as it has to exist to be updated
export async function updatePaper(id, body) {
    const updatedPaper = await prisma.Paper.update({
      where: {
        id: id,
      },
      data: {
        title: body.title,
        abstract: body.abstract,
        authors: body.authors,
        pdfPath: body.pdfPath,
        reviewers: body.reviewers,
      },
    });
    return updatedPaper;
}

//deletes a paper based on the id
export async function deletePaper(id) {
    const deletedPaper = await prisma.Paper.delete({
      where: {
        id: id,
      },
    });
  
    return deletedPaper;
}
//------------------------------------------------------------------------------------------------------------//




//CRUD for Outer Scope Schedule ---- DONE
//creates a schedule
export async function createSchedule(schedule) {
    const createdSchedule = await prisma.Schedule.create({
      data: {
        ...schedule,
        created: new Date(),
      },
    });
  
    return createdSchedule;
}

//returns all schedules
export async function readSchedules() {
    const schedules = await prisma.Schedule.findMany({
      include: {
        sessions: true,
      },
    });
    return schedules;
}

//returns a schedule based on the id
export async function readSchedule(id) {
    const schedule = await prisma.Schedule.findUnique({
      where: {
        id: id,
      },
      include: {
        sessions: true,
      },
    });
  
    return schedule;
}

//updates a schedule based on the id
export async function updateSchedule(id, body) {
    const updatedSchedule = await prisma.Schedule.update({
      where: {
        id: id,
      },
      data: {
        fromDate: body.fromDate,
        toDate: body.toDate,
        sessions: body.sessions,
      },
    });
    return updatedSchedule;
}

//deletes a schedule based on the id 
export async function deleteSchedule(id) {
    const deletedSchedule = await prisma.Schedule.delete({
      where: {
        id: id,
      },
    });
  
    return deletedSchedule;
}
//------------------------------------------------------------------------------------------------------------//




// Users CRUD ---- DONE
//creates a user
export async function createUser(user) {
    const createdUser = await prisma.User.create({
      data: {
        ...user
      },
    });
  
    return createdUser;
}

//returns all users of specific type or all users
export async function readUsers(type) {
    let users;
  
    if (type === null || type === "null" || !type) {
      users = await prisma.User.findMany();
    } else {
      users = await prisma.User.findMany({
        where: {
          role: type,
        },
      });
    }
    return users;
}

//returns a user based on the id
export async function readUser(id) {
    const user = await prisma.User.findUnique({
      where: {
        id: id,
      },
    });
  
    return user;
}

//updates a user based on the id ---- role to lower case
export async function updateUser(id, body) {
    const updatedUser = await prisma.User.update({
      where: {
        id: id,
      },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        role: body.role.toLowerCase(),
      },
    });
  
    return updatedUser;
}

//deletes a user based on the id
export async function deleteUser(id) {
    const deletedUser = await prisma.User.delete({
      where: {
        id: id,
      },
    });
  
    return deletedUser;
}
//------------------------------------------------------------------------------------------------------------//




// CRUD for Outer Scope Sessions ---- DONE
//creates a new session only if the schedule exists in the schdeule
export async function createSession(session, scheduleId) {
    const schedule = await prisma.Schedule.findUnique({
      where: {
        id: scheduleId,
      },
    });
  
    if (schedule) {
      const createdSession = await prisma.Session.create({
        data: {
          ...session,
          Schedule: {
            connect: {
              id: scheduleId,
            },
          },
          created: new Date(),
        },
      });
  
      return createdSession;
    }
    return null;
}

//returns all sessions of a schedule
export async function readSessions(scheduleId) {
    const schedule = await prisma.Schedule.findUnique({
      where: {
        id: scheduleId,
      }
    });
  
    if (schedule) {
      const sessions = await prisma.Session.findMany({
        where: {
          scheduleId: scheduleId,
        },
        include: {
          events: true,
        },
      });
  
      return sessions;
    }
    return null;
}

//reads a session of a schedule based on id
export async function readSession(scheduleId, sessionId) {
    const schedule = await prisma.Schedule.findUnique({
      where: {
        id: scheduleId,
      },
    });
  
    if (schedule) {
      const session = await prisma.Session.findUnique({
        where: {
          id: sessionId,
        },
        include: {
          sessions: true,
        },
      });
  
      return session;
    }
    return null;
}

//updates a session of a schedule based on id
export async function updateSession(scheduleId, sessionId, body) {
    const schedule = await prisma.Schedule.findUnique({
      where: {
        id: scheduleId,
      },
    });
  
    if (schedule) {
      const session = await prisma.Session.findUnique({
        where: {
          id: sessionId,
        },
      });
  
      if (session) {
        const updatedSession = await prisma.Session.update({
          where: {
            id: sessionId,
          },
          data: {
            events: body.events,
            location: body.location,
            title: body.title,
          },
        });
  
        return updatedSession;
      }
    }
    return null;
}

//deletes a session of a schedule based on id
export async function deleteSession(scheduleId, sessionId) {
    const schedule = await prisma.Schedule.findUnique({
      where: {
        id: scheduleId,
      },
    });
  
    if (schedule) {
      const session = await prisma.Session.findUnique({
        where: {
          id: sessionId,
        },
      });
  
      if (session) {
        const deletedSession = await prisma.Session.delete({
          where: {
            id: sessionId,
          },
        });
  
        return deletedSession;
      }
    }
    return null;
}
//------------------------------------------------------------------------------------------------------------//




// CRUD for Inner Scope Events ---- DONE
//creates an event only if the schedule and session exist
export async function createEvent(event, scheduleid, sessionid) {
    const schedule = await prisma.Schedule.findUnique({
      where: {
        id: scheduleid,
      },
    });
  
    if (schedule) {
      const session = await prisma.Session.findUnique({
        where: {
          id: sessionid,
        },
      });
  
      if (session) {
        const createdEvent = await prisma.Event.create({
          data: {
            ...event,
            Session: {
              connect: {
                id: sessionid,
              },
            },
            created: new Date(),
          },
        });
  
        return createdEvent;
      }
    }
    return null;
}

//returns all events of a session in a schedule sorted basd on start time
export async function readEvents(scheduleid, sessionid) {
    const schedule = await prisma.Schedule.findUnique({
      where: {
        id: scheduleid,
      },
    });
  
    if (schedule) {
      const session = await prisma.Session.findUnique({
        where: {
          id: sessionid,
        },
      });
  
      if (session) {
        const events = await prisma.Event.findMany({
          where: {
            sessionId: sessionid,
          },
          orderBy: {
            startTime: 'asc',
          },
        });
  
        return events;
      }
    }
    return null;
    
}

//read events of a session in a schedule based on id -- won't use the previous function as we are using databases directly instead of arrays
export async function readEvent(scheduleid, sessionid, id) {
    const schedule = await prisma.Schedule.findUnique({
      where: {
        id: scheduleid,
      },
    });
  
    if (schedule) {
      const session = await prisma.Session.findUnique({
        where: {
          id: sessionid,
        },
      });
  
      if (session) {
        const event = await prisma.Event.findUnique({
          where: {
            id: id,
          },
        });
        return event;
      }
    }
    return null;
}

//updates an event of a session in a schedule based on id
export async function updateEvent(scheduleid, sessionid, id, body) {
    const schedule = await prisma.Schedule.findUnique({
      where: {
        id: scheduleid,
      },
    });
  
    if (schedule) {
      const session = await prisma.Session.findUnique({
        where: {
          id: sessionid,
        },
      });
  
      if (session) {
        const updatedEvent = await prisma.Event.update({
          where: {
            id: id,
          },
          data: {
            title: body.title,
            presenter: body.presenter,
            startTime: body.startTime,
            endTime: body.endTime,
          },
        });
  
        return updatedEvent;
      }
    }
    return null;
}

//deletes an event of a session in a schedule based on id
export async function deleteEvent(scheduleid, sessionid, id) {
    const schedule = await prisma.Schedule.findUnique({
      where: {
        id: scheduleid,
      },
    });
  
    if (schedule) {
      const session = await prisma.Session.findUnique({
        where: {
          id: sessionid,
        },
      });
  
      if (session) {
        const deletedEvent = await prisma.Event.delete({
          where: {
            id: id,
          },
        });
  
        return deletedEvent;
      }
    }
    return null;
}
//------------------------------------------------------------------------------------------------------------//
