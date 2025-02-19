import { openDB } from "idb";

const DB_NAME = "QuizApp";
const STORE_NAME = "quizAttempts";

async function initDB() {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
            }
        },
    });
}

export async function saveQuizAttempt(score, totalQuestions) {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    await tx.store.add({ score, totalQuestions, date: new Date() });
}

export async function getQuizHistory() {
    const db = await initDB();
    return db.getAll(STORE_NAME);
}
