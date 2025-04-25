## Deployment Instructions

**Prerequisites:**

* **Docker:** Ensure you have Docker installed on your system. You can download it from <https://www.docker.com/get-started>.

* **Docker Compose:** Docker Compose is usually included with Docker Desktop. If you installed Docker Desktop, you should have Docker Compose. You can also install it separately if needed. Check the Docker documentation for installation instructions: <https://docs.docker.com/compose/install/>

**Steps:**

1.  **Navigate to the Directory:** Once you've cloned the repo, open a terminal or command prompt and navigate to the react-python-postgres directory.

    ```
    cd react-python-postgres
    ```

2.  **Start the Application:** Run the following command to start all the services defined in the `docker-compose.yml` file:

    ```
    docker compose up -d
    ```

    * `-d` flag: Runs the containers in detached mode (in the background). If you don't use the `-d` flag, you'll see the logs in your terminal, and you'll need to keep the terminal window open.
    * **⚠️Note:** If you have PostgreSQL installed on your machine already, you may see and error relating to the port 5432 being already in use. You can find which process is using this port and kill it with the following commands. You will then need to run the above command again.

    ```
    sudo lsof -i :5432
    ```

    ```
    sudo kill PID
    ```

3.  **Verify the Services:** After the containers have started, you can check their status using the following command:

    ```
    docker compose ps
    ```

    This will show you a list of the running containers and their status. You should see your `db`, `backend`, and `frontend` services listed.

4.  **Access the Application:**

    * **Frontend:** Open your web browser and go to `http://localhost:3000`. You should see your React application running.

    * **Backend:** The backend API should be accessible at `http://localhost:8000`. You can test it using a tool like `curl` or Postman, or by interacting with the frontend.

    * **Database:** The Postgres database is running on `localhost:5432`. You can connect to it using a database client (e.g., `psql`, pgAdmin) if needed. Note that the database is usually accessed by the backend service, not directly by the user.

**Stopping the Application:**

To stop all the services, run the following command:

```
docker compose down
```

This will stop and remove the containers. However, the data in the named volumes (e.g., `db_data`) will persist.

**Data Persistence:**

* The data for the Postgres database is stored in the `db_data` volume. This ensures that your database data is not lost when the containers are stopped or removed.

**Important Notes:**

* **Network:** The services can communicate with each other using their service names (e.g., `db`, `backend`, `frontend`) as hostnames. Docker Compose sets up a network that allows this communication.

* **Environment Variables:** The code in this project is not production ready and there are some hard coded variables that would be better handles as environment variables. An improvement to be made would be to store the important data secretly and pass them in via environment variables. For example `POSTGRES_USER`, `POSTGRES_PASSWORD`, `REACT_APP_API_BASE_URL`, and the Database URL.