import { RepoController } from './controllers/RepoController.ts'
import { RepoModel } from './models/RepoModel.ts'
import { RepoView } from './views/RepoView.ts'

const view = new RepoView()
const model = new RepoModel()
const controller = new RepoController(view, model)

controller.start()
