const API_BASE_HOST_URL = "http://localhost:5000/host";
const API_BASE_GET_URL = "http://localhost:5000/get";

export const fetchAll = async () => {
  try {
    const response = await fetch(`${API_BASE_GET_URL}/fetch-all`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching all data:', error);
    throw error;
  }
}

export const fetchById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_GET_URL}/fetch-by-id/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data by ID ${id}:`, error);
    throw error;
  }
}

export const fetchMembersById = async (groupId, memberId) => {
  try {
    const response = await fetch(`${API_BASE_GET_URL}/fetch-members-by-id/${groupId}/${memberId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching members by group ID ${groupId} and member ID ${memberId}:`, error);
    throw error;
  }
}

export const simplifiedExpences = async (groupId) => {
  try {
    const response = await fetch(`${API_BASE_GET_URL}/simplified/${groupId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching simplified expenses for group ID ${groupId}:`, error);
    throw error;
  }
}

export const addGroup = async (groupData) => {
  try {
    const response = await fetch(`${API_BASE_HOST_URL}/add-group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groupData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding group:', error);
    throw error;
  }
}

export const addMembers = async (groupId, memberData) => {
  try {
    const response = await fetch(`${API_BASE_HOST_URL}/groups/${groupId}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memberData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error adding members to group ID ${groupId}:`, error);
    throw error;
  }
}

export const addExpense = async (groupId, memberId, expenseData) => {
  try {
    const response = await fetch(`${API_BASE_HOST_URL}/add-expences/${groupId}/${memberId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expenseData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error adding expense for group ID ${groupId} and member ID ${memberId}:`, error);
    throw error;
  }
}