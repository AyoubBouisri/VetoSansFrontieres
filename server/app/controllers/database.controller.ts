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
      "/animal/:noAnimal", 
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getAnimal(req.params.noAnimal)
          .then((result: pg.QueryResult) => {
            res.json(result.rows[0]);
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

    router.get(
      "/traitements/:noAnimal",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getTraitements(req.params.noAnimal)
          .then((result: pg.QueryResult) => {
            res.json(result.rows);
          })

          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    )

    router.get(
      "/examens/:noAnimal",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getExamens(req.params.noAnimal)
          .then((result: pg.QueryResult) => {
            res.json(result.rows);
          })

          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    )

    router.post(
      "/animal/update", 
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .updateAnimal(req.body)
          .then((result: pg.QueryResult) => {
            res.json(1);
          })

          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      });

    return router;
  }
}
