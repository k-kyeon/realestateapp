import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { firstName, lastName, email, clerkId } = await request.json();

    if (!firstName || !lastName || !email || !clerkId) {
      return Response.json(
        {
          error: "Missing some required fields",
        },
        { status: 400 },
      );
    }

    const response = await sql`
        INSERT INTO users ( 
          firstName,
          lastName, 
          email, 
          clerk_id 
        )
        VALUES (
          ${firstName},
          ${lastName}, 
          ${email}, 
          ${clerkId}
        )
        `;

    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error }, { status: 500 });
  }
}
