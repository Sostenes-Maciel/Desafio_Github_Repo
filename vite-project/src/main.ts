import { RepoController } from './controllers/RepoController.ts'
import { RepoView } from './views/RepoView.ts'

const view = new RepoView()
const controller = new RepoController(view)

controller.start()
