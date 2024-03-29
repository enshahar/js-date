DateTime.Field.WeekOfYear.Test = {};

DateTime.Field.WeekOfYear.Test.testSetValue = function() {
    var week = DateTime.Field.WeekOfYear.Test.createWoY().value(2);

    assertEquals(2, week.value());
};

DateTime.Field.WeekOfYear.Test.testGetMillis_Mon_Second = function() {
    var week = DateTime.Field.WeekOfYear.Test.createWoY().millis(time(2000, 1, 3));

    assertEquals(2 * DateTime.MILLIS_PER_DAY, week.millis());
};

DateTime.Field.WeekOfYear.Test.testGetMillis_Sun_Second = function() {
    var week = DateTime.Field.WeekOfYear.Test.createWoY(DateTime.Field.DaysOfWeek.SUNDAY).millis(time(2000, 1, 2));

    assertEquals(DateTime.MILLIS_PER_DAY, week.millis());
};

DateTime.Field.WeekOfYear.Test.testGetMillis_Thu_Second = function() {
    var week = DateTime.Field.WeekOfYear.Test.createWoY(DateTime.Field.DaysOfWeek.THURSDAY).millis(time(2000, 1, 6));

    assertEquals(5 * DateTime.MILLIS_PER_DAY, week.millis());
};

DateTime.Field.WeekOfYear.Test.testGetMillis_Mon_Six = function() {
    var week = DateTime.Field.WeekOfYear.Test.createWoY().millis(time(2000, 1, 31));

    assertEquals(2 * DateTime.MILLIS_PER_DAY + 4 * DateTime.MILLIS_PER_WEEK, week.millis());
};

DateTime.Field.WeekOfYear.Test.testGetMillis_Value_Mon_54_Weeks = function() {
    var week = DateTime.Field.WeekOfYear.Test.createWoY(DateTime.Field.DaysOfWeek.MONDAY, 2012, 1, 1).value(54);

    assertEquals(DateTime.MILLIS_PER_DAY + 52 * DateTime.MILLIS_PER_WEEK, week.millis());
};

DateTime.Field.WeekOfYear.Test.testGetMillis_Value_Mon_Last_Weeks = function() {
    var week = DateTime.Field.WeekOfYear.Test.createWoY(DateTime.Field.DaysOfWeek.MONDAY, 2012, 1, 1).value(DateTime.Field.WeekOfYear.LAST_WEEK);

    assertEquals(DateTime.MILLIS_PER_DAY + 52 * DateTime.MILLIS_PER_WEEK, week.millis());
};

DateTime.Field.WeekOfYear.Test.testGetMillis_Value_Mon_54_Weeks_Fail = function() {
    assertFail(function() {
        DateTime.Field.WeekOfYear.Test.createWoY(DateTime.Field.DaysOfWeek.MONDAY, 2000, 1, 1).value(54);
    });
};

DateTime.Field.WeekOfYear.Test.testGetMillis_Value_Sun_54_Weeks = function() {
    var week = DateTime.Field.WeekOfYear.Test.createWoY(DateTime.Field.DaysOfWeek.SUNDAY, 2000, 1, 1).value(54);

    assertEquals(DateTime.MILLIS_PER_DAY + 52 * DateTime.MILLIS_PER_WEEK, week.millis());
};

DateTime.Field.WeekOfYear.Test.testGetMillis_Value_Sun_Last_Weeks = function() {
    var week = DateTime.Field.WeekOfYear.Test.createWoY(DateTime.Field.DaysOfWeek.SUNDAY, 2000, 1, 1).value(DateTime.Field.WeekOfYear.LAST_WEEK);

    assertEquals(DateTime.MILLIS_PER_DAY + 52 * DateTime.MILLIS_PER_WEEK, week.millis());
};

DateTime.Field.WeekOfYear.Test.testGetMillis_Value_Sun_54_Weeks_Fail = function() {
    assertFail(function() {
        DateTime.Field.WeekOfYear.Test.createWoY(DateTime.Field.DaysOfWeek.SUNDAY, 2012, 1, 1).value(54);
    });
};

DateTime.Field.WeekOfYear.Test.testSetValue_text = function() {
    assertFail(function() {
        DateTime.Field.WeekOfYear.Test.createWoY().value("a");
    });
};

DateTime.Field.WeekOfYear.Test.testSetValue_long = function() {
    assertFail(function() {
        DateTime.Field.WeekOfYear.Test.createWoY().value("11231237012730198239812398");
    });
};

DateTime.Field.WeekOfYear.Test.testSetValue_hex = function() {
    assertFail(function() {
        DateTime.Field.WeekOfYear.Test.createWoY().value("0x1");
    });
};

DateTime.Field.WeekOfYear.Test.testSetValue_zeroTrail = function() {
    assertEquals(12, DateTime.Field.WeekOfYear.Test.createWoY().value("012").value());
};

DateTime.Field.WeekOfYear.Test.testSetValue_negative = function() {
    assertFail(function() {
        DateTime.Field.WeekOfYear.Test.createWoY().value("-1");
    });
};

DateTime.Field.WeekOfYear.Test.createWoY = function(firstDay, year, month, daysOfMonth) {
    return new DateTime.Field.WeekOfYear(DateTime.Field.WeekOfYear.Test.mockCalendar(firstDay, year, month, daysOfMonth));
};

DateTime.Field.WeekOfYear.Test.mockCalendar = function(firstDay, year, month, daysOfMonth) {
    firstDay = DateTime.exists(firstDay, DateTime.Field.DaysOfWeek.MONDAY);
    year = DateTime.exists(year, 2000);
    month = DateTime.exists(month, 1);
    daysOfMonth = DateTime.exists(daysOfMonth, 1);

    return mock({
        time: time(year, month, daysOfMonth),
        getYear: mock({
            isLeap: ((year & 3) === 0 && (year % 100 !== 0 || year % 400 === 0)),
            millis: time(year, 1, 1)
        }),
        getFirstWeekDay: firstDay
    });
};
