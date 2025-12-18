import axios from "axios";
import { faker } from "@faker-js/faker";

const URL = "http://localhost:3100/api/v1/auth/register";
const NUM_USERS = 100;

/**
 * Generates an array of random user objects
 */
const generateUsers = count => {
    return Array.from({ length: count }, () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        return {
            email: faker.internet.email({ firstName, lastName }).toLowerCase(),
            first_name: firstName,
            last_name: lastName,
            age: faker.number.int({ min: 18, max: 80 }),
            isActive: faker.datatype.boolean(0.8), // 80% chance of being true
            isAdmin: false,
            isSuperAdmin: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            password: "dummy@123"
        };
    });
};

/**
 * Sends the generated users to the API
 */
const populateDatabase = async () => {
    console.log(`Generating ${NUM_USERS} users...`);
    const users = generateUsers(NUM_USERS);
    users.forEach(async (user) => { 

        try {
            const response = await axios.post(URL, user);
            
            console.log(`Successfully sent ${NUM_USERS} users.`);
            console.log(`Status: ${response.status}`);
            console.log("Response:", response.data);
        } catch (error) {
            if (error.response) {
                console.error(`Server Error (${error.response.status}):`, error.response.data);
            } else {
                console.error("Connection Error:", error.message);
            }
        }
    });
};

populateDatabase();
