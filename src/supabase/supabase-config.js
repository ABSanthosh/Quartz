import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://fappnzrkiilsyylnrflq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQyMjQyODYxLCJleHAiOjE5NTc4MTg4NjF9.bDtxaXiNFOdHDji47-rVtJcvKoxRUYkoQMqgw_L-qNE"
);

export default supabase;