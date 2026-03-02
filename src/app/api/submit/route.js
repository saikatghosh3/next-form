export async function POST(request) {
  const body = await request.json();
  const { name, email } = body;

  if (!name || !email) {
    return Response.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  return Response.json({
    message: "Form submitted successfully!",
    data: {
      name,
      email,
      submittedAt: new Date().toLocaleString(),
    },
  });
}