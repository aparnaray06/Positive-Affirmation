import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.static("Public"));

const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

app.get("/", (req, res) => {
    res.send("Server is running")
});

app.get("/joke", async (req, res) => {
    try {
        const response = await fetch(url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": process.env.GEMINI_API_KEY
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: "Give me one short funny joke."
                                }
                            ]
                        }
                    ]
                })
            }
        );
        const data = await response.json();
        if (!response.ok) {
            return res.status(response.status).json({
                error: data.error?.message || "Gemini API error"
            });
        }
        const joke = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!joke) {
            return res.status(500).json({
                error: "No joke received from Gemini"
            });
        }


        res.json({
            joke: joke
        });
    } catch (error) {
        console.log("Gemini Error", error);

        res.status(500).json({
            error: "Failed to generate joke"
        });
    }
})

app.get("/motivation", async (req, res) => {
    try {
        const response = await fetch(url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": process.env.GEMINI_API_KEY
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: "Give me one short motivational quote."
                                }
                            ]
                        }
                    ]
                })
            }
        );
        const data = await response.json();
        const motivation = data.candidates[0].content.parts[0].text;

        res.json({
            motivation: motivation
        });
    } catch (error) {
        console.log("Gemini Error", error);

        res.status(500).json({
            error: "Failed to generate motivation quote"
        });
    }
})

app.get("/tip-of-the-day", async (req, res) => {
    try {
        const response = await fetch(url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": process.env.GEMINI_API_KEY
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: "Give me one useful tip of the day."
                                }
                            ]
                        }
                    ]
                })
            }
        );
        const data = await response.json();
        const tip = data.candidates[0].content.parts[0].text;

        res.json({
            tip: tip
        });
    } catch (error) {
        console.log("Gemini Error", error);

        res.status(500).json({
            error: "Failed to generate tip"
        });
    }
})

app.listen(8000, () => {
    console.log("Server is running at PORT 8000");
})