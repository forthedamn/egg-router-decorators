# egg-router-decorators


Write @decorators in egg router

# Usage

## Install

```
npm i egg-router-decorators --save
```

## 1.Wrire controller

`app/controller/home.ts`

```

import { HttpMethod, route } from 'egg-router-decorators';

// This is prefix
@route('/api')
class HomeController extends Controller {

  // get: /api/text
  @route('/text', HttpMethod.GET)
  async index() {
    this.ctx.body = 'hi, egg';
  }

}

module.exports = HomeController;
```

## 2. Load route

`app/router.ts`

```
import { loadRoute } from 'egg-router-decorators';

module.exports = app => {
  loadRoute(app);
};


```

