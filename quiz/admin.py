from django.contrib import admin
from .models import Quiz
from .models import Question
from .models import Answer
from nested_inline.admin import NestedStackedInline, NestedModelAdmin


class AnswerInline(NestedStackedInline):
  model = Answer
  extra = 4
  max_num = 4

  fieldsets = [
    (None, {'fields': ['answer']}),
    (None, {'fields': ['is_correct']}),
  ]


class QuestionInline(NestedStackedInline):
  model = Question
  extra = 1
  inlines = [AnswerInline]


class QuizAdmin(NestedModelAdmin):
  inlines = [QuestionInline]


admin.site.register(Quiz, QuizAdmin)
