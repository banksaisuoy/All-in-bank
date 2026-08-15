    expect(screen.getByText('+$3000.00')).toBeInTheDocument();

    // Verify row count (2 data rows + 1 header row)
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3);
  });
});
