export default function CommentMenu({
  isMyComment,
  openMenu,
  setOpenMenu,
  onDelete,
  onUpdate,
}) {
  async function handleDeleteClick() {
    try {
      await onDelete();
      setOpenMenu(false);
    } catch (error) {
      console.log("Delete Error:", error);
    }
  }

  function handleEditClick() {
    onUpdate();
    setOpenMenu(false);
  }

  function handleToggleMenu() {
    setOpenMenu(!openMenu);
  }

  return (
    <div className="relative ml-2">
      <button
        onClick={handleToggleMenu}
        className="text-gray-400 hover:text-gray-700 px-2 text-lg"
      >
        ⋮
      </button>

      {openMenu && (
        <div className="absolute right-0  w-20 bg-white border rounded-s shadow-lg text-xs z-60">
          {isMyComment && (
            <button
              onClick={handleEditClick}
              className="block w-full text-left px-2 py-1.5 hover:bg-gray-100"
            >
              Edit
            </button>
          )}

          <button
            onClick={handleDeleteClick}
            className="block w-full text-left px-2 py-1.5 hover:bg-red-50 text-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
