import * as dotenv from 'dotenv'
import { envsafe, str } from 'envsafe'

dotenv.config()

export const env = envsafe({
  NTP_API_KEY: str(),
  NTP_API_URL: str(),
  PIXABAY_API_KEY: str(),
})
