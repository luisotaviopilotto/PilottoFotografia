import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "subscribers.json");

async function getSubscribers(): Promise<Subscriber[]> {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code: string }).code === "ENOENT"
    ) {
      // File does not exist yet, ensure directory exists and initialize
      await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
      await fs.writeFile(DATA_FILE_PATH, "[]", "utf-8");
      return [];
    }
    console.error("Error reading subscribers file:", error);
    return [];
  }
}

async function saveSubscribers(subscribers: Subscriber[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(subscribers, null, 2), "utf-8");
}

export async function GET() {
  try {
    const subscribers = await getSubscribers();
    return NextResponse.json({
      count: subscribers.length,
      subscribers,
    });
  } catch {
    return NextResponse.json(
      { error: "Erro ao consultar a lista de cadastros." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "O campo de e-mail é obrigatório." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        { error: "Por favor, insira um endereço de e-mail válido." },
        { status: 400 }
      );
    }

    const subscribers = await getSubscribers();

    const existingSubscriber = subscribers.find(
      (sub) => sub.email.toLowerCase() === normalizedEmail
    );

    if (existingSubscriber) {
      return NextResponse.json({
        success: true,
        message: "Este e-mail já estava cadastrado na nossa lista VIP!",
        alreadySubscribed: true,
      });
    }

    const newSubscriber: Subscriber = {
      id: crypto.randomUUID(),
      email: normalizedEmail,
      createdAt: new Date().toISOString(),
    };

    subscribers.push(newSubscriber);
    await saveSubscribers(subscribers);

    return NextResponse.json({
      success: true,
      message: "E-mail cadastrado com sucesso!",
      subscriber: {
        id: newSubscriber.id,
        email: newSubscriber.email,
        createdAt: newSubscriber.createdAt,
      },
    });
  } catch (error) {
    console.error("Erro ao salvar assinante:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor ao cadastrar o e-mail." },
      { status: 500 }
    );
  }
}
