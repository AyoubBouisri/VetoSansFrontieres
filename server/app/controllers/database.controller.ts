import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private databaseService: DatabaseService
  ) {
  }

  public get router(): Router {
    const router: Router = Router();

    // ======= CLINIQUES ROUTES =======
    router.get("/cliniques", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService
        .getAllCliniques()
        .then((result: pg.QueryResult) => {
          res.json(result.rows);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });

    router.get(
      "/cliniques/:noClinique",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getCliniqueByNo(req.params.noClinique)
          .then((result: pg.QueryResult) => {
            res.json(result.rows[0]);
          })

          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    router.get(
      "/animaux/:noClinique",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getAllAnimalsFromClinique(req.params.noClinique)
          .then((result: pg.QueryResult) => {
            res.json(result.rows);
          })

          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    )

    router.get(
      "/animaux/:noClinique/:queryText",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getAnimalsFromQuery(req.params.noClinique, req.params.queryText)
          .then((result: pg.QueryResult) => {
            res.json(result.rows);
          })

          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    )

    router.get(
      "/facture/:noAnimal",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getFacture(req.params.noAnimal)
          .then((result: pg.QueryResult) => {
            res.json(result.rows[0]);
          })

          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    )

    router.get(
      "/proprietaires/:noClinique", 
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getProprietaires(req.params.noClinique)
          .then((result: pg.QueryResult) => {
            res.json(result.rows);
          })

          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    )
    router.post(
      "/animaux/delete/:noAnimal",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .deleteAnimal(req.params.noAnimal)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })

          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    )

    router.post(  
      "/animaux/insert",
      (req: Request, res: Response, _: NextFunction) => {
        console.log(req.body)
        this.databaseService
          .addAnimal(req.body)
          .then((result: pg.QueryResult) => {
            res.json(1);
          })

          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }

    )


  //   router.post(
  //     "/hotels/insert",
  //     (req: Request, res: Response, _: NextFunction) => {
  //       const hotel: Hotel = {
  //         hotelnb: req.body.hotelnb,
  //         name: req.body.name,
  //         city: req.body.city,
  //       };

  //       this.databaseService
  //         .createHotel(hotel)
  //         .then((result: pg.QueryResult) => {
  //           res.json(result.rowCount);
  //         })
  //         .catch((e: Error) => {
  //           console.error(e.stack);
  //           res.json(-1);
  //         });
  //     }
  //   );


  //   // router.post(
  //   //   "/hotels/delete/:hotelNb",
  //   //   (req: Request, res: Response, _: NextFunction) => {
  //   //     const hotelNb: string = req.params.hotelNb;
  //   //     this.databaseService
  //   //       .deleteHotel(hotelNb)
  //   //       .then((result: pg.QueryResult) => {
  //   //         res.json(result.rowCount);
  //   //       })
  //   //       .catch((e: Error) => {
  //   //         console.error(e.stack);
  //   //       });
  //   //   }
  //   // );


  //   router.put(
  //     "/hotels/update",
  //     (req: Request, res: Response, _: NextFunction) => {
  //       const hotel: Hotel = {
  //         hotelnb: req.body.hotelnb,
  //         name: req.body.name ? req.body.name : "",
  //         city: req.body.city ? req.body.city : "",
  //       };

  //       this.databaseService
  //         .updateHotel(hotel)
  //         .then((result: pg.QueryResult) => {
  //           res.json(result.rowCount);
  //         })
  //         .catch((e: Error) => {
  //           console.error(e.stack);
  //         });
  //     }
  //   );


  //   // ======= ROOMS ROUTES =======
  //   router.get("/rooms", (req: Request, res: Response, _: NextFunction) => {
  //     const hotelNb = req.query.hotelNb ? req.query.hotelNb : "";
  //     const roomNb = req.query.roomNb ? req.query.roomNb : "";
  //     const roomType = req.query.type ? req.query.type : "";
  //     const roomPrice = req.query.price ? parseFloat(req.query.price) : -1;

  //     this.databaseService
  //       .filterRooms(hotelNb, roomNb, roomType, roomPrice)
  //       .then((result: pg.QueryResult) => {
  //         const rooms: Room[] = result.rows.map((room: Room) => ({
  //           hotelnb: room.hotelnb,
  //           roomnb: room.roomnb,
  //           type: room.type,
  //           price: parseFloat(room.price.toString()),
  //         }));

  //         res.json(rooms);
  //       })
  //       .catch((e: Error) => {
  //         console.error(e.stack);
  //       });
  //   });


  //   router.post(
  //     "/rooms/insert",
  //     (req: Request, res: Response, _: NextFunction) => {
  //       const room: Room = {
  //         hotelnb: req.body.hotelnb,
  //         roomnb: req.body.roomnb,
  //         type: req.body.type,
  //         price: parseFloat(req.body.price),
  //       };

  //       this.databaseService
  //         .createRoom(room)
  //         .then((result: pg.QueryResult) => {
  //           res.json(result.rowCount);
  //         })
  //         .catch((e: Error) => {
  //           console.error(e.stack);
  //           res.json(-1);
  //         });
  //     }
  //   );


  //   router.put(
  //     "/rooms/update",
  //     (req: Request, res: Response, _: NextFunction) => {
  //       const room: Room = {
  //         hotelnb: req.body.hotelnb,
  //         roomnb: req.body.roomnb,
  //         type: req.body.type,
  //         price: parseFloat(req.body.price),
  //       };

  //       this.databaseService
  //         .updateRoom(room)
  //         .then((result: pg.QueryResult) => {
  //           res.json(result.rowCount);
  //         })
  //         .catch((e: Error) => {
  //           console.error(e.stack);
  //           res.json(-1);
  //         });
  //     }
  //   );


  //   router.post(
  //     "/rooms/delete/:hotelNb/:roomNb",
  //     (req: Request, res: Response, _: NextFunction) => {
  //       const hotelNb: string = req.params.hotelNb;
  //       const roomNb: string = req.params.roomNb;

  //       this.databaseService
  //         .deleteRoom(hotelNb, roomNb)
  //         .then((result: pg.QueryResult) => {
  //           res.json(result.rowCount);
  //         })
  //         .catch((e: Error) => {
  //           console.error(e.stack);
  //           res.json(-1);
  //         });
  //     }
  //   );


  //   // ======= GUEST ROUTES =======
  //   router.post(
  //     "/guests/insert",
  //     (req: Request, res: Response, _: NextFunction) => {
  //       const guest: Guest = {
  //         guestnb: req.body.guestnb,
  //         nas: req.body.nas,
  //         name: req.body.name,
  //         gender: req.body.gender,
  //         city: req.body.city
  //       };

  //       this.databaseService
  //         .createGuest(guest)
  //         .then((result: pg.QueryResult) => {
  //           res.json(result.rowCount);
  //         })
  //         .catch((e: Error) => {
  //           console.error(e.stack);
  //           res.json(-1);
  //         });
  //     }
  //   );


  //   router.get(
  //     "/guests/:hotelNb/:roomNb",
  //     (req: Request, res: Response, _: NextFunction) => {
  //       const hotelNb: string = req.params.hotelNb;
  //       const roomNb: string = req.params.roomNb;

  //       this.databaseService
  //       .getGuests(hotelNb, roomNb)
  //       .then((result: pg.QueryResult) => {
  //         const guests: Guest[] = result.rows.map((guest: any) => ({
  //           guestnb: guest.guestnb,
  //           nas: guest.nas,
  //           name: guest.name,
  //           gender: guest.gender,
  //           city: guest.city,
  //         }));
  //         res.json(guests);
  //       })
  //       .catch((e: Error) => {
  //         console.error(e.stack);
  //         res.json(-1);
  //       });
  //     }
  //   );


  //   // ======= GENERAL ROUTES =======
  //   router.get(
  //     "/tables/:tableName",
  //     (req: Request, res: Response, next: NextFunction) => {
  //       this.databaseService
  //         .getAllFromTable(req.params.tableName)
  //         .then((result: pg.QueryResult) => {
  //           res.json(result.rows);
  //         })
  //         .catch((e: Error) => {
  //           console.error(e.stack);
  //         });
  //     }
  //   );

    return router;
  }
}
