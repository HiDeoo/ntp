import * as dotenv from 'dotenv'
import { envsafe, str } from 'envsafe'

dotenv.config()

export const env = envsafe({
  PIXABAY_API_KEY: str(),
})
