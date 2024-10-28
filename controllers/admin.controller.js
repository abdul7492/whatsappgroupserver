import Category from '../models/category.model.js'; // Assuming you have Category model
export const getCategory = async (req, res) => {
  try {
    const categories = await Category.find(); // Fetch all categories
    res.status(200).json(categories); // Send the categories in the response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const cate = new Category({ name });
    
    await cate.save(); 
    res.status(201).json({ message: 'Category created successfully', cate });
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params; // Get the category ID from request params
    const { name } = req.body; // Get the updated category name from request body

    // Find the category by ID and update the name
    const updatedCategory = await Category.findByIdAndUpdate(
      id, 
      { name }, // Update the category name
      { new: true, runValidators: true } // Return the updated category
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category updated successfully', updatedCategory });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
};