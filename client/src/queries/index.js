import { gql } from "@apollo/client";

export const LAUNCH_QUERY = gql`
    query getLaunchQuery($flight_number: Int) {
        launch (flight_number: $flight_number) {
            flight_number,
            mission_name,
            launch_date_local,
            launch_success,
            links {
                mission_patch,
                wikipedia,
                youtube_id
            },
            rocket {
                rocket_name,
                rocket_type
            }
        }
    }
`;

export const LAUNCHES_QUERY = gql`
    query getLaunchesQuery {
        launches {
            id,
            flight_number,
            name,
            date_local,
            success,
            links {
                patch {
                    small
                }
            }
        }
    }
`;