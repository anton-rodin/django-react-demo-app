from django.db import models

class Quiz(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    picture = models.URLField(max_length=500, default='')

    def __str__(self):
        return self.title


class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name='questions')
    question = models.CharField(max_length=200)

    def __str__(self):
        return self.question


class Answer(models.Model):
    question = models.ForeignKey(Question, related_name='answers')
    answer = models.CharField(max_length=200)
    is_correct = models.BooleanField()

    def __str__(self):
        return self.answer
