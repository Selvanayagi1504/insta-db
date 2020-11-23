const Router = require("express").Router();
const Controller = require("../controllers/controller");

Router.get("/getuser/:moboremail",
  Controller.getuser
);
Router.get("/getpost",
  Controller.getpost
);
Router.post("/like/:email",
  Controller.like
);
Router.post("/saveuser",
  Controller.saveuser
);
Router.post("/changepass/:email",
  Controller.changepass
);
Router.post("/changepoto/:email",
  Controller.changepoto
);
Router.post("/edit/:email",
  Controller.edit
);


module.exports = Router;