    });

    // Verify row count (2 data rows + 1 header row)
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3);
  });
});