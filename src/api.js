const API_URL = "http://localhost:3001/notes";

export const getNotes = async () => {
  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error("Failed to fetch notes");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
};



// POST - Create Note
export const createNote = async (note) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  if (!res.ok) {
    throw new Error("Failed to create note");
  }

  return await res.json();
};

// PATCH - Update Note
export const updateNote = async (id, updates) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    throw new Error("Failed to update note");
  }

  return await res.json();
};

// DELETE - Delete Note
export const deleteNote = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete note");
  }

  return true;
};
